# Air Station Monitor API (FastAPI)

Read-only API that powers the **Station Monitor** section on the resume site. It
reports which air-quality stations have landed in Supabase for the latest hourly
ingestion run, and which are still missing.

```
Next.js (Vercel)  ->  this API (Render)  ->  Supabase RPC get_station_monitor()  ->  air_stations
```

The companion ingestion pipeline (`Air_Pipeline_2`, Airflow) writes into
`air_stations` every hour at minute **:45**. The frontend polls this API at the
top of each hour, so the "4 PM round" is checked at ~5 PM.

## Endpoints

| Method | Path                  | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| GET    | `/api/health`         | Liveness probe (used by Render).              |
| GET    | `/api/monitor/status` | Per-station reported/missing status + counts. |
| GET    | `/docs`               | Swagger UI.                                   |

`/api/monitor/status` response:

```jsonc
{
  "snapshot_at": "2026-06-14 16:45:00",   // latest ingestion run (Asia/Bangkok)
  "checked_at":  "2026-06-14 17:00:05",
  "timezone":    "Asia/Bangkok",
  "total":         220,
  "reported_count": 215,
  "missing_count":    5,
  "stations": [
    {
      "station_id": "bkp57t",
      "area_th": "...", "area_en": "...", "station_type": "GROUND",
      "lat": 13.7, "lon": 100.5,
      "last_recorded_at": "2026-06-14 16:00:00",
      "last_created_at":  "2026-06-14 16:45:00",
      "last_aqi": "42",
      "reported": true
    }
  ]
}
```

A station is `reported: true` when it appears in the most-recent snapshot
(`created_at = MAX(created_at)`); otherwise it's counted as missing.

## Setup

1. **Create the RPC.** In the Supabase SQL editor, run [`monitor.sql`](./monitor.sql) once.
2. **Configure env.** Copy `.env.example` -> `.env` and fill `SUPABASE_URL` / `SUPABASE_KEY`.

## Run locally

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# open http://localhost:8000/docs
```

## Deploy to Render

Either commit `render.yaml` and use **New + -> Blueprint**, or create a **Web Service** manually:

- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Health Check Path:** `/api/health`
- **Environment variables:** `SUPABASE_URL`, `SUPABASE_KEY`, and
  `ALLOWED_ORIGINS` (e.g. `https://your-site.vercel.app,http://localhost:3000`)

> Render's free web services sleep when idle, so the first request after a quiet
> spell can take ~30–60s to wake. The frontend handles the loading/timeout state.

## Wire up the frontend

Set on Vercel (and `.env.local` for dev):

```
NEXT_PUBLIC_MONITOR_API_URL=https://air-station-monitor-api.onrender.com
```
