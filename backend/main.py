import os
from datetime import datetime

import pytz
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY environment variables are required")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
BKK = pytz.timezone("Asia/Bangkok")

app = FastAPI(title="Air Station Monitor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=ALLOWED_ORIGIN_REGEX,
    allow_credentials=False,
    allow_methods=["GET"],
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
