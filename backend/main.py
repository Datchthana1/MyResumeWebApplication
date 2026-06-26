import json
import os
from datetime import datetime
from typing import List, Optional

import httpx
import pytz
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

ALLOWED_ORIGINS = [
    o.strip().rstrip("/")
    for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")
    if o.strip()
]

ALLOWED_ORIGIN_REGEX = os.getenv("ALLOWED_ORIGIN_REGEX", r"https://.*\.vercel\.app")

STALE_THRESHOLD_MIN = int(os.getenv("STALE_THRESHOLD_MINUTES", "90"))

RECORDED_STALE_MIN = int(os.getenv("RECORDED_STALE_MINUTES", "180"))

# ── Airflow REST API (pipeline-stage indicator) ──────────────────────────────
# The monitor page shows which pipeline stage (PL1/PL2/PL3) is running. We read
# live state from Airflow's stable REST API (v1). Configure via env:
#   AIRFLOW_BASE_URL   e.g. https://airflow.example.com  (no trailing /api)
#   AIRFLOW_USERNAME / AIRFLOW_PASSWORD   (basic auth)  — or —
#   AIRFLOW_TOKEN      (bearer token, takes precedence over basic auth)
#   AIRFLOW_STAGES     JSON array describing the stages, e.g.
#     [{"id":"PL1","name":"Ingest & Transform","dag_id":"air_station_ingest",
#       "task_id":"transform_station","description":"..."}, ...]
# If AIRFLOW_STAGES is unset we fall back to a 3-stage skeleton with empty
# dag_ids, so the UI still renders a (static) stepper until you wire real DAGs.
AIRFLOW_BASE_URL = os.getenv("AIRFLOW_BASE_URL", "").rstrip("/")
AIRFLOW_USERNAME = os.getenv("AIRFLOW_USERNAME")
AIRFLOW_PASSWORD = os.getenv("AIRFLOW_PASSWORD")
AIRFLOW_TOKEN = os.getenv("AIRFLOW_TOKEN")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY environment variables are required")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
BKK = pytz.timezone("Asia/Bangkok")

app = FastAPI(title="Air Station Monitor API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=ALLOWED_ORIGIN_REGEX,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def _to_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _snapshot_age_minutes(snapshot_at, now):
    if not snapshot_at:
        return None
    try:
        dt = BKK.localize(datetime.strptime(snapshot_at, "%Y-%m-%d %H:%M:%S"))
    except ValueError:
        return None
    return max(0, int((now - dt).total_seconds() // 60))


@app.get("/")
def root():
    return {"service": "Air Station Monitor API", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/monitor/status")
def monitor_status():
    try:
        res = supabase.rpc("get_station_monitor", {}).execute()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Supabase error: {exc}") from exc

    rows = res.data or []
    now = datetime.now(BKK)

    stations = []
    snapshot_at = None
    for r in rows:
        reported = bool(r.get("reported"))
        last_created_at = r.get("last_created_at")
        last_recorded_at = r.get("last_recorded_at")
        if reported and last_created_at:
            if snapshot_at is None or last_created_at > snapshot_at:
                snapshot_at = last_created_at

        recorded_age = _snapshot_age_minutes(last_recorded_at, now)
        data_fresh = recorded_age is not None and recorded_age <= RECORDED_STALE_MIN

        if not reported:
            status = "missing"
        elif data_fresh:
            status = "ok"
        else:
            status = "stale"

        stations.append(
            {
                "station_id": r.get("station_id"),
                "area_th": r.get("area_th"),
                "area_en": r.get("area_en"),
                "station_type": r.get("station_type"),
                "lat": _to_float(r.get("lat")),
                "lon": _to_float(r.get("lon")),
                "last_recorded_at": last_recorded_at,
                "last_created_at": last_created_at,
                "last_aqi": r.get("last_aqi"),
                "recorded_age_minutes": recorded_age,
                "data_fresh": data_fresh,
                "reported": reported,
                "status": status,
            }
        )

    total = len(stations)
    ok_count = sum(1 for s in stations if s["status"] == "ok")
    stale_count = sum(1 for s in stations if s["status"] == "stale")
    missing_count = sum(1 for s in stations if s["status"] == "missing")

    age = _snapshot_age_minutes(snapshot_at, now)
    is_stale = age is None or age > STALE_THRESHOLD_MIN

    return {
        "snapshot_at": snapshot_at,
        "checked_at": now.strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": "Asia/Bangkok",
        "snapshot_age_minutes": age,
        "stale_threshold_minutes": STALE_THRESHOLD_MIN,
        "recorded_stale_minutes": RECORDED_STALE_MIN,
        "is_stale": is_stale,
        "total": total,
        "ok_count": ok_count,
        "stale_count": stale_count,
        "missing_count": missing_count,
        "reported_count": ok_count + stale_count,
        "stations": stations,
    }


_DEFAULT_LIMIT = {"hour": 48, "day": 7, "month": 12}


@app.get("/api/stations/{station_id}/history")
def station_history(station_id: str, granularity: str = "day", limit: int | None = None):
    if granularity not in ("hour", "day", "month"):
        raise HTTPException(status_code=400, detail="granularity must be hour, day or month")

    n = limit if limit is not None else _DEFAULT_LIMIT[granularity]
    n = max(1, min(int(n), 366))

    try:
        res = supabase.rpc(
            "get_station_history",
            {"p_station_id": station_id, "p_granularity": granularity, "p_limit": n},
        ).execute()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Supabase error: {exc}") from exc

    points = list(reversed(res.data or []))
    return {"station_id": station_id, "granularity": granularity, "points": points}


# ── Pipeline stage indicator (live Airflow) ──────────────────────────────────

_DEFAULT_STAGES = [
    {
        "id": "PL1",
        "name": "Ingest & Transform",
        "dag_id": "",
        "description": "Pull air4thai + OpenWeather, clean, and write per-station tables.",
    },
    {
        "id": "PL2",
        "name": "Build Data Mart",
        "dag_id": "",
        "description": "Assemble the dim/fact mart from the per-station tables.",
    },
    {
        "id": "PL3",
        "name": "Aggregate & Publish",
        "dag_id": "",
        "description": "Roll up history and publish the latest snapshot to Supabase.",
    },
]


def _load_stages():
    raw = os.getenv("AIRFLOW_STAGES")
    if raw:
        try:
            stages = json.loads(raw)
            if isinstance(stages, list) and stages:
                return stages
        except json.JSONDecodeError:
            pass
    return _DEFAULT_STAGES


def _airflow_client():
    headers = {}
    auth = None
    if AIRFLOW_TOKEN:
        headers["Authorization"] = f"Bearer {AIRFLOW_TOKEN}"
    elif AIRFLOW_USERNAME and AIRFLOW_PASSWORD:
        auth = (AIRFLOW_USERNAME, AIRFLOW_PASSWORD)
    return httpx.Client(base_url=AIRFLOW_BASE_URL, timeout=8.0, auth=auth, headers=headers)


@app.get("/api/pipeline/status")
def pipeline_status():
    """Live state of each pipeline stage (PL1/PL2/PL3) from Airflow.

    Degrades gracefully: if Airflow isn't configured/reachable, the stage
    definitions still come back (state="unconfigured"/"error") so the frontend
    can render a static stepper instead of breaking.
    """
    stages = _load_stages()
    now = datetime.now(BKK)
    configured = bool(
        AIRFLOW_BASE_URL and (AIRFLOW_TOKEN or (AIRFLOW_USERNAME and AIRFLOW_PASSWORD))
    )
    result_stages = []
    reachable = False

    if configured:
        try:
            with _airflow_client() as client:
                for st in stages:
                    dag_id = (st.get("dag_id") or "").strip()
                    entry = {**st, "state": "unconfigured", "last_run_at": None, "run_id": None}
                    if not dag_id:
                        result_stages.append(entry)
                        continue
                    try:
                        r = client.get(
                            f"/api/v1/dags/{dag_id}/dagRuns",
                            params={"order_by": "-start_date", "limit": 1},
                        )
                        if r.status_code == 200:
                            reachable = True
                            runs = r.json().get("dag_runs", [])
                            if runs:
                                run = runs[0]
                                entry["state"] = run.get("state") or "none"
                                entry["last_run_at"] = run.get("start_date")
                                entry["run_id"] = run.get("dag_run_id")
                                # Optional task-level state inside the run.
                                task_id = (st.get("task_id") or "").strip()
                                if task_id and entry["run_id"]:
                                    tr = client.get(
                                        f"/api/v1/dags/{dag_id}/dagRuns/"
                                        f"{entry['run_id']}/taskInstances/{task_id}"
                                    )
                                    if tr.status_code == 200:
                                        entry["state"] = tr.json().get("state") or entry["state"]
                            else:
                                entry["state"] = "none"
                        elif r.status_code in (401, 403):
                            entry["state"] = "unauthorized"
                        else:
                            entry["state"] = "error"
                    except httpx.HTTPError:
                        entry["state"] = "error"
                    result_stages.append(entry)
        except Exception:  # noqa: BLE001 — never let Airflow break the endpoint
            if not result_stages:
                result_stages = [
                    {**st, "state": "error", "last_run_at": None, "run_id": None}
                    for st in stages
                ]
    else:
        result_stages = [
            {**st, "state": "unconfigured", "last_run_at": None, "run_id": None}
            for st in stages
        ]

    # Active = the stage that's running; otherwise the last one that succeeded.
    active = next((s["id"] for s in result_stages if s["state"] == "running"), None)
    if active is None:
        active = next(
            (s["id"] for s in reversed(result_stages) if s["state"] == "success"), None
        )

    return {
        "configured": configured,
        "airflow_reachable": reachable,
        "checked_at": now.strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": "Asia/Bangkok",
        "active_stage": active,
        "stages": result_stages,
    }


# ── Chat logging (who wants to hire / who asks what) ─────────────────────────


class ChatLogPayload(BaseModel):
    session_id: Optional[str] = None
    question: Optional[str] = None
    answer: Optional[str] = None
    intent: Optional[str] = None  # "hiring" | "question" | "other"
    topics: Optional[List[str]] = None
    lang: Optional[str] = None
    contact: Optional[str] = None  # email/phone the visitor volunteered
    messages: Optional[list] = None  # full transcript (optional)


@app.post("/api/chat/log")
def chat_log(payload: ChatLogPayload, request: Request):
    """Persist one chat turn (and detected intent) to Supabase `chat_logs`.

    Called server-to-server from the Next.js /api/chat route, so it carries no
    secrets to the browser. Intent/topics/contact are best-effort signals.
    """
    row = {
        "session_id": payload.session_id,
        "question": payload.question,
        "answer": payload.answer,
        "intent": payload.intent,
        "topics": payload.topics,
        "lang": payload.lang,
        "contact": payload.contact,
        "transcript": payload.messages,
        "user_agent": request.headers.get("user-agent"),
        "created_at": datetime.now(BKK).strftime("%Y-%m-%d %H:%M:%S"),
    }
    try:
        supabase.table("chat_logs").insert(row).execute()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Supabase insert error: {exc}") from exc
    return {"ok": True}
