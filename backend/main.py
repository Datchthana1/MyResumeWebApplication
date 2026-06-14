"""
Air Station Monitor — FastAPI backend.

Exposes a single read-only endpoint that the resume frontend polls once per hour
to show which air-quality stations have reported into Supabase in the latest
ingestion snapshot, and which are still missing.

Data flow:  Next.js (Vercel)  ->  this API (Render)  ->  Supabase RPC  ->  air_stations

The heavy lifting lives in the `get_station_monitor()` Postgres function
(see monitor.sql). Run that once in the Supabase SQL editor before deploying.
"""

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

# Comma-separated list of allowed origins, e.g.
#   "https://your-site.vercel.app,http://localhost:3000"
# Defaults to "*" so local development works out of the box.
# Trailing slashes are stripped — a browser Origin header never has one, so
# "https://site.app/" would otherwise silently fail to match.
ALLOWED_ORIGINS = [
    o.strip().rstrip("/")
    for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")
    if o.strip()
]

# The pipeline ingests hourly at minute :45, so the freshest snapshot is at most
# ~1h old. If the latest snapshot is older than this, a whole cycle was missed
# and we treat the pipeline as "down" (data not arriving).
STALE_THRESHOLD_MIN = int(os.getenv("STALE_THRESHOLD_MINUTES", "90"))

# A station can be re-written every hour (fresh created_at) while air4thai keeps
# returning the SAME stale reading (recorded_at frozen). So a fresh created_at
# alone doesn't mean fresh data. If a station's last *recorded_at* is older than
# this, its actual measurement is stale even though the pipeline still touches it.
RECORDED_STALE_MIN = int(os.getenv("RECORDED_STALE_MINUTES", "180"))

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY environment variables are required")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
BKK = pytz.timezone("Asia/Bangkok")

app = FastAPI(title="Air Station Monitor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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
    """Whole minutes between the latest snapshot and `now` (both BKK)."""
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
    """
    Latest-snapshot monitoring status for every known station.

    `reported` is computed server-side in Supabase against MAX(created_at):
    a station is "reported" when it appears in that most-recent ingestion run.
    Everything else is "missing" (didn't send for the latest round).
    """
    try:
        res = supabase.rpc("get_station_monitor", {}).execute()
    except Exception as exc:  # noqa: BLE001 — surface any client/db failure as 502
        raise HTTPException(status_code=502, detail=f"Supabase error: {exc}") from exc

    rows = res.data or []
    now = datetime.now(BKK)

    stations = []
    snapshot_at = None  # = global MAX(created_at); shared by all reported rows
    for r in rows:
        reported = bool(r.get("reported"))
        last_created_at = r.get("last_created_at")
        last_recorded_at = r.get("last_recorded_at")
        if reported and last_created_at:
            if snapshot_at is None or last_created_at > snapshot_at:
                snapshot_at = last_created_at

        # Freshness of the actual reading, independent of whether the pipeline
        # re-wrote the row. recorded_at uses the same "YYYY-MM-DD HH:MM:SS" form.
        recorded_age = _snapshot_age_minutes(last_recorded_at, now)
        data_fresh = recorded_age is not None and recorded_age <= RECORDED_STALE_MIN

        # Three-state status:
        #   missing -> not in the latest ingestion snapshot at all
        #   stale   -> re-written this cycle, but the reading itself is old
        #   ok      -> in the latest snapshot AND the reading is fresh
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
                "reported": reported,   # kept: present in latest snapshot
                "status": status,
            }
        )

    total = len(stations)
    ok_count = sum(1 for s in stations if s["status"] == "ok")
    stale_count = sum(1 for s in stations if s["status"] == "stale")
    missing_count = sum(1 for s in stations if s["status"] == "missing")

    age = _snapshot_age_minutes(snapshot_at, now)
    # "down" = no data at all, or the latest snapshot is older than one cycle.
    is_stale = age is None or age > STALE_THRESHOLD_MIN

    return {
        "snapshot_at": snapshot_at,                # latest ingestion run (BKK), or None if empty
        "checked_at": now.strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": "Asia/Bangkok",
        "snapshot_age_minutes": age,               # how old the latest snapshot is
        "stale_threshold_minutes": STALE_THRESHOLD_MIN,
        "recorded_stale_minutes": RECORDED_STALE_MIN,
        "is_stale": is_stale,                       # True => pipeline likely down
        "total": total,
        "ok_count": ok_count,                       # reported AND reading fresh
        "stale_count": stale_count,                 # reported but reading stale
        "missing_count": missing_count,             # not in latest snapshot
        "reported_count": ok_count + stale_count,   # present in latest snapshot
        "stations": stations,
    }


# Sensible default number of buckets per granularity.
_DEFAULT_LIMIT = {"hour": 48, "day": 7, "month": 12}


@app.get("/api/stations/{station_id}/history")
def station_history(station_id: str, granularity: str = "day", limit: int | None = None):
    """
    Time series for one station, aggregated by hour / day / month.
    Includes both Air4Thai pollutants and OpenWeather (ow_*) fields.
    Points are returned oldest -> newest (chart-friendly).
    """
    if granularity not in ("hour", "day", "month"):
        raise HTTPException(status_code=400, detail="granularity must be hour, day or month")

    n = limit if limit is not None else _DEFAULT_LIMIT[granularity]
    n = max(1, min(int(n), 366))

    try:
        res = supabase.rpc(
            "get_station_history",
            {"p_station_id": station_id, "p_granularity": granularity, "p_limit": n},
        ).execute()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Supabase error: {exc}") from exc

    points = list(reversed(res.data or []))  # RPC returns newest-first
    return {"station_id": station_id, "granularity": granularity, "points": points}
