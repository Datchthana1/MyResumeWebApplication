// Pipeline-stage indicator — inferred from the DATA, queried straight from
// Supabase by Next.js (no dependency on the FastAPI/Render backend).
//
// Idea: the pipeline ingests once an hour (~minute :45–:46). We don't ask
// Airflow what's running; we just look at whether each layer has the latest
// round's data yet:
//   PL0 Ingest    → raw landing table has a row at/after this hour's :45 boundary
//   PL1 Transform → per-station station_* tables are updated (get_station_monitor)
//   PL2 Dim/Fact  → the dim/fact mart is updated
// The first layer that does NOT yet have the current round is the one "running".
//
// ── Environment (set these on Vercel) ────────────────────────────────────────
//   SUPABASE_URL          required — your project URL
//   SUPABASE_KEY          required — service-role key (server-side only here, so
//                         it bypasses RLS for these read-only checks)
//   PIPELINE_RAW_TABLE    optional — raw landing table   (default: air_stations)
//   PIPELINE_RAW_TS       optional — its timestamp column (default: created_at)
//   PIPELINE_MART_TABLE   optional — dim/fact table to check for PL2 (no default;
//                         until set, PL2 shows "Not linked")
//   PIPELINE_MART_TS      optional — its timestamp column (default: created_at)
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";

const SB_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SB_KEY = process.env.SUPABASE_KEY || "";

const RAW_TABLE = process.env.PIPELINE_RAW_TABLE || "air_stations";
const RAW_TS = process.env.PIPELINE_RAW_TS || "created_at";
const MART_TABLE = process.env.PIPELINE_MART_TABLE || "";
const MART_TS = process.env.PIPELINE_MART_TS || "created_at";

const BKK = "+07:00"; // Bangkok is a fixed UTC+7 (no DST)

// "YYYY-MM-DD HH:MM:SS" (Bangkok local text) -> absolute Date
function parseBkk(ts) {
  if (!ts || typeof ts !== "string") return null;
  const d = new Date(`${ts.trim().replace(" ", "T")}${BKK}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function bkkParts(d) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  if (p.hour === "24") p.hour = "00";
  return p;
}

function fmtBkk(d) {
  const p = bkkParts(d);
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

// Most recent :45 boundary (Bangkok) — the moment the current round's ingest is due.
function expectedRound(now = new Date()) {
  const p = bkkParts(now);
  let boundary = new Date(`${p.year}-${p.month}-${p.day}T${p.hour}:45:00${BKK}`);
  if (parseInt(p.minute, 10) < 45) boundary = new Date(boundary.getTime() - 3600_000);
  return boundary;
}

async function sb(path, init) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        ...(init?.headers || {}),
      },
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Latest timestamp in a plain table (PostgREST order+limit).
async function latestFromTable(table, tsCol) {
  const rows = await sb(
    `${encodeURIComponent(table)}?select=${encodeURIComponent(tsCol)}&order=${encodeURIComponent(tsCol)}.desc&limit=1`
  );
  return rows?.[0]?.[tsCol] ?? null;
}

// PL1 freshness via the existing RPC: max(last_created_at) across station_*.
async function pl1SnapshotTs() {
  const rows = await sb(`rpc/get_station_monitor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  let max = null;
  for (const r of rows || []) {
    const c = r?.last_created_at;
    if (c && (max === null || c > max)) max = c; // fixed-width text -> lexical = chronological
  }
  return max;
}

export async function GET() {
  const now = new Date();
  const round = expectedRound(now);

  const skeleton = [
    { id: "PL0", name: "Ingest", description: "Raw air4thai + OpenWeather lands in Supabase (~minute :46 each hour)." },
    { id: "PL1", name: "Transform", description: "Per-station station_* tables updated with the latest round." },
    { id: "PL2", name: "Dim / Fact", description: "Dimensional + fact mart refreshed from the per-station tables." },
  ];

  if (!SB_URL || !SB_KEY) {
    return Response.json({
      configured: false,
      source: "supabase-data",
      checked_at: fmtBkk(now),
      timezone: "Asia/Bangkok",
      active_stage: null,
      stages: skeleton.map((s) => ({ ...s, state: "unconfigured", last_run_at: null })),
    });
  }

  // Gather the latest timestamp each layer has, independently + resiliently.
  const [pl0, pl1, pl2] = await Promise.all([
    RAW_TABLE
      ? latestFromTable(RAW_TABLE, RAW_TS).then((ts) => ({ ts })).catch(() => ({ error: true }))
      : Promise.resolve({ unconfigured: true }),
    pl1SnapshotTs().then((ts) => ({ ts })).catch(() => ({ error: true })),
    MART_TABLE
      ? latestFromTable(MART_TABLE, MART_TS).then((ts) => ({ ts })).catch(() => ({ error: true }))
      : Promise.resolve({ unconfigured: true }),
  ]);

  const layers = [pl0, pl1, pl2];
  const stages = skeleton.map((s, i) => {
    const r = layers[i];
    let state;
    if (r.unconfigured) state = "unconfigured";
    else if (r.error) state = "error";
    else {
      const d = parseBkk(r.ts);
      state = d && d.getTime() >= round.getTime() ? "success" : "pending";
    }
    return { ...s, state, last_run_at: r.ts ?? null };
  });

  // The first not-yet-fresh layer (in order) is the one currently being awaited;
  // any later not-fresh layers are queued behind it.
  let activeStage = null;
  for (const st of stages) {
    if (st.state === "pending") {
      if (!activeStage) {
        st.state = "running";
        activeStage = st.id;
      } else {
        st.state = "scheduled";
      }
    }
  }

  return Response.json({
    configured: true,
    source: "supabase-data",
    checked_at: fmtBkk(now),
    expected_round: fmtBkk(round),
    timezone: "Asia/Bangkok",
    active_stage: activeStage,
    stages,
  });
}
