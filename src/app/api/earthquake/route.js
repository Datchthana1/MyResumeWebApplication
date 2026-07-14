// Earthquake section for the monitor page — queried straight from Supabase by
// Next.js (same pattern as /api/pipeline, no dependency on the FastAPI/Render
// backend). Two tables feed this:
//   earthquake_reports_raw — one row per hourly fetch from the TMD API (PL0).
//                             Its freshest `fetched_at` is what tells us
//                             whether the pipeline is actually still landing
//                             data in Supabase — NOT the same thing as "is
//                             there a recent earthquake" (there may not be).
//   earthquake_events      — the parsed/deduped events (PL1), one row per quake.
//
// ── Environment (set on Vercel) ──────────────────────────────────────────────
//   SUPABASE_URL / SUPABASE_KEY   required — same project as the air monitor.
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";

const SB_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SB_KEY = process.env.SUPABASE_KEY || "";

const EVENTS_TABLE = "earthquake_events";
const RAW_TABLE = "earthquake_reports_raw";

// PL0 ingests hourly; give it some slack before calling the feed stale.
const STALE_THRESHOLD_MIN = 90;

const BKK = "+07:00"; // Bangkok is a fixed UTC+7 (no DST)

// "YYYY-MM-DD HH:MM:SS" (Bangkok local text, e.g. fetched_at) -> absolute Date
function parseBkk(ts) {
  if (!ts || typeof ts !== "string") return null;
  const d = new Date(`${ts.trim().replace(" ", "T")}${BKK}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

// "YYYY-MM-DD HH:MM:SS" (UTC text, e.g. datetime_utc) -> absolute Date
function parseUtcText(ts) {
  if (!ts || typeof ts !== "string") return null;
  const d = new Date(`${ts.trim().replace(" ", "T")}Z`);
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

// UTC "now minus N hours" as "YYYY-MM-DD HH:MM:SS" text, comparable to
// datetime_utc lexically (fixed-width, so lexical order = chronological order).
function utcTextHoursAgo(hours) {
  return new Date(Date.now() - hours * 3600_000).toISOString().slice(0, 19).replace("T", " ");
}

function ageMinutes(d, now) {
  if (!d) return null;
  return Math.max(0, Math.round((now.getTime() - d.getTime()) / 60_000));
}

async function sbFetch(path, extraHeaders) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    return await fetch(`${SB_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        ...(extraHeaders || {}),
      },
      cache: "no-store",
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function sbJson(path) {
  const res = await sbFetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Exact row count for a filtered query, via PostgREST's Content-Range header
// (cheap — asks for 1 row but reads the total from the header, not the body).
async function sbCount(path) {
  const res = await sbFetch(`${path}`, { Prefer: "count=exact", Range: "0-0" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const range = res.headers.get("content-range"); // e.g. "0-0/42"
  const total = range ? parseInt(range.split("/")[1], 10) : NaN;
  return Number.isFinite(total) ? total : null;
}

export async function GET() {
  const now = new Date();

  if (!SB_URL || !SB_KEY) {
    return Response.json({
      configured: false,
      checked_at: fmtBkk(now),
      timezone: "Asia/Bangkok",
      source: { status: "unconfigured", last_fetch_at: null, fetch_age_minutes: null },
      stats: { total_24h: 0, domestic_24h: 0 },
      events: [],
    });
  }

  const since24h = utcTextHoursAgo(24);

  try {
    const [latestFetchRows, eventRows, total24h, domestic24h] = await Promise.all([
      sbJson(`${RAW_TABLE}?select=fetched_at&order=fetched_at.desc&limit=1`),
      sbJson(
        `${EVENTS_TABLE}?select=datetime_utc,datetime_thai,magnitude,depth_km,lat,lon,` +
          `title_th,tambon_th,amphoe_th,province_th,location_en,is_domestic` +
          `&order=datetime_utc.desc&limit=20`
      ),
      sbCount(`${EVENTS_TABLE}?select=id&datetime_utc=gte.${encodeURIComponent(since24h)}`),
      sbCount(
        `${EVENTS_TABLE}?select=id&datetime_utc=gte.${encodeURIComponent(since24h)}&is_domestic=eq.true`
      ),
    ]);

    const lastFetchAt = latestFetchRows?.[0]?.fetched_at ?? null;
    const fetchAgeMin = ageMinutes(parseBkk(lastFetchAt), now);
    const sourceStatus =
      lastFetchAt == null ? "offline" : fetchAgeMin <= STALE_THRESHOLD_MIN ? "live" : "stale";

    const latestEventAt = eventRows?.[0]?.datetime_utc ?? null;

    return Response.json({
      configured: true,
      checked_at: fmtBkk(now),
      timezone: "Asia/Bangkok",
      source: {
        status: sourceStatus,
        last_fetch_at: lastFetchAt,
        fetch_age_minutes: fetchAgeMin,
        stale_threshold_minutes: STALE_THRESHOLD_MIN,
      },
      stats: {
        total_24h: total24h ?? 0,
        domestic_24h: domestic24h ?? 0,
        latest_event_at: latestEventAt,
        latest_event_age_minutes: ageMinutes(parseUtcText(latestEventAt), now),
      },
      events: eventRows ?? [],
    });
  } catch (err) {
    return Response.json(
      {
        configured: true,
        checked_at: fmtBkk(now),
        timezone: "Asia/Bangkok",
        source: { status: "offline", last_fetch_at: null, fetch_age_minutes: null },
        stats: { total_24h: 0, domestic_24h: 0 },
        events: [],
        error: err.message || "error",
      },
      { status: 502 }
    );
  }
}
