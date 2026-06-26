"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { API_BASE } from "@/components/monitorApi";
import StationDetail from "@/components/StationDetail";
import PipelineStatus from "@/components/PipelineStatus";

// Leaflet touches `window`, so load the map only on the client.
const StationMap = dynamic(() => import("@/components/StationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-3xl bg-black/[0.03] text-sm text-neutral-400">
      …
    </div>
  ),
});

// Render free tier can cold-start for ~30–60s, so give the request room.
const FETCH_TIMEOUT_MS = 75_000;
const HOUR_MS = 60 * 60 * 1000;

/**
 * Fetches the monitor status and re-fetches once per hour, aligned to the top
 * of the hour. The ingestion pipeline writes at minute :45, so polling at :00
 * means we read the previous hour's round (the "4 PM round" is seen at ~5 PM).
 */
export function useMonitorData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setError(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(`${API_BASE}/api/monitor/status`, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setLastFetched(new Date());
    } catch (err) {
      setError(err.name === "AbortError" ? "timeout" : err.message || "error");
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();

    // Schedule the first refresh at the next top-of-hour, then every hour.
    const now = new Date();
    const msToNextHour =
      HOUR_MS - (now.getMinutes() * 60_000 + now.getSeconds() * 1000 + now.getMilliseconds());

    let interval;
    const timeout = setTimeout(() => {
      load();
      interval = setInterval(load, HOUR_MS);
    }, msToNextHour);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [load]);

  return { data, loading, error, lastFetched, refresh: load };
}

/* --------------------------------- bits --------------------------------- */

// Per-station status palette. "ok" = reported + reading fresh, "stale" =
// reported but the reading is old, "missing" = not in the latest snapshot.
const STATUS = {
  ok: { tone: "good", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700", row: "" },
  stale: { tone: "warn", dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700", row: "bg-amber-50/40" },
  missing: { tone: "bad", dot: "bg-rose-500", badge: "bg-rose-50 text-rose-700", row: "bg-rose-50/40" },
};

function statusLabel(status, m) {
  if (status === "ok") return m.statusOk;
  if (status === "stale") return m.statusStaleData;
  return m.statusMissing;
}

function StatCard({ value, label, tone = "neutral" }) {
  const tones = {
    neutral: "text-neutral-950",
    good: "text-emerald-600",
    warn: "text-amber-600",
    bad: "text-rose-600",
  };
  return (
    <div className="card-thin rounded-2xl px-4 py-4 text-center sm:px-5">
      <div className={`text-3xl font-bold tabular-nums ${tones[tone]}`}>{value}</div>
      <div className="mt-1 text-xs font-mono uppercase tracking-widest text-neutral-400">
        {label}
      </div>
    </div>
  );
}

function HealthBar({ ok, total }) {
  const pct = total > 0 ? Math.round((ok / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
        <span>{pct}%</span>
        <span className="tabular-nums">
          {ok} / {total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/8">
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const DOT_COLORS = { good: "bg-emerald-500", warn: "bg-amber-500", bad: "bg-rose-500" };

function StatusDot({ tone = "good" }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      {tone === "good" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${DOT_COLORS[tone]}`} />
    </span>
  );
}

// minutes -> "2h 15m" / "45m" using localized units.
function formatAge(mins, m) {
  if (mins == null) return "—";
  const h = Math.floor(mins / 60);
  const rem = mins % 60;
  return h > 0 ? `${h}${m.unitHour} ${rem}${m.unitMin}` : `${rem}${m.unitMin}`;
}

// Resolve the overall banner status into a tone + label.
function deriveStatus(data, error, loading, m) {
  if (error) return { tone: "bad", label: m.statusOffline };
  if (loading || !data) return { tone: "warn", label: m.loading };
  if (data.is_stale) return { tone: "bad", label: m.statusStale };
  if (data.missing_count > 0) return { tone: "bad", label: m.someMissing };
  if (data.stale_count > 0) return { tone: "warn", label: m.someStaleData };
  return { tone: "good", label: m.allReported };
}

/* ------------------------------- compact -------------------------------- */

/**
 * Compact summary used inside the resume home page (#monitor section).
 */
export function MonitorSummary() {
  const { t } = useLang();
  const m = t.monitor;
  const { data, loading, error, refresh } = useMonitorData();
  const status = deriveStatus(data, error, loading, m);

  return (
    <div className="card rounded-3xl p-7 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <StatusDot tone={status.tone} />
          <span className="text-sm font-medium text-neutral-700">{status.label}</span>
        </div>
        <span className="font-mono text-xs text-neutral-400">
          {m.snapshotLabel}: {data?.snapshot_at ?? "—"}
        </span>
      </div>

      {!error && data?.is_stale && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
          <span className="mt-0.5 text-rose-500">⚠</span>
          <div className="text-sm">
            <p className="font-medium text-rose-700">{m.staleTitle}</p>
            <p className="mt-0.5 text-rose-600/80">
              {m.staleSince} {formatAge(data.snapshot_age_minutes, m)}
            </p>
          </div>
        </div>
      )}

      {error ? (
        <div className="mt-6 text-sm text-neutral-500">
          {m.error}{" "}
          <button onClick={refresh} className="underline underline-offset-4 hover:text-neutral-900">
            {m.retry}
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <StatCard value={loading ? "…" : data.ok_count} label={m.statusOk} tone="good" />
            <StatCard
              value={loading ? "…" : data.stale_count}
              label={m.statusStaleData}
              tone={data && data.stale_count > 0 ? "warn" : "neutral"}
            />
            <StatCard
              value={loading ? "…" : data.missing_count}
              label={m.statusMissing}
              tone={data && data.missing_count > 0 ? "bad" : "neutral"}
            />
          </div>

          {!loading && data && (
            <div className="mt-6">
              <HealthBar ok={data.ok_count} total={data.total} />
            </div>
          )}
        </>
      )}

      <div className="mt-7 flex items-center justify-between">
        <Link
          href="/monitor"
          className="inline-flex items-center gap-2 text-neutral-950 transition-all hover:gap-3 hover:text-black"
        >
          {m.viewAll}
          <span aria-hidden>&rarr;</span>
        </Link>
        <span className="font-mono text-[11px] text-neutral-400">{m.autoHourly}</span>
      </div>
    </div>
  );
}

/* -------------------------------- full ---------------------------------- */

/**
 * Full dashboard with map, searchable / filterable per-station table, and a
 * click-through detail view (/monitor).
 */
export function MonitorBoard() {
  const { lang, t } = useLang();
  const m = t.monitor;
  const { data, loading, error, lastFetched, refresh } = useMonitorData();
  const status = deriveStatus(data, error, loading, m);

  const [filter, setFilter] = useState("all"); // all | ok | stale | missing
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null); // station for the detail view

  const stations = data?.stations ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stations.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (!q) return true;
      return (
        (s.station_id || "").toLowerCase().includes(q) ||
        (s.area_en || "").toLowerCase().includes(q) ||
        (s.area_th || "").toLowerCase().includes(q)
      );
    });
  }, [stations, filter, query]);

  const areaOf = (s) => (lang === "th" ? s.area_th || s.area_en : s.area_en || s.area_th) || "—";

  const filters = [
    { id: "all", label: m.filterAll, count: data?.total },
    { id: "missing", label: m.statusMissing, count: data?.missing_count },
    { id: "stale", label: m.statusStaleData, count: data?.stale_count },
    { id: "ok", label: m.statusOk, count: data?.ok_count },
  ];

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            {m.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            {m.title}
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-500">{m.subtitle}</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-full border border-black/15 px-4 py-2 text-sm text-neutral-800 transition-all hover:border-black/40 hover:text-black disabled:opacity-50 sm:self-auto"
        >
          <span className={loading ? "animate-spin" : ""}>↻</span>
          {loading ? m.loading : m.refresh}
        </button>
      </div>

      {/* Meta line */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs text-neutral-400">
        <span className="inline-flex items-center gap-2">
          <StatusDot tone={status.tone} />
          {status.label}
        </span>
        <span>
          {m.snapshotLabel}: {data?.snapshot_at ?? "—"}
        </span>
        <span>
          {m.checkedLabel}: {lastFetched ? lastFetched.toLocaleTimeString() : "—"}
        </span>
        {data?.snapshot_age_minutes != null && (
          <span>
            {m.ageLabel}: {formatAge(data.snapshot_age_minutes, m)}
          </span>
        )}
      </div>

      {/* Cold-start explainer — why values can read null / — on first load.
          The monitor API sleeps on the free tier; the first request "boosts"
          it awake before any data can be fetched. */}
      {(loading || error) && (
        <div
          className="mt-6 flex items-start gap-3 rounded-2xl border px-5 py-4"
          style={{ borderColor: "var(--accent-soft)", background: "var(--accent-soft)" }}
        >
          <span
            className={`mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${loading ? "animate-ping" : ""}`}
            style={{ background: "var(--accent)" }}
          />
          <div className="text-sm">
            <p className="font-semibold text-neutral-800">{m.coldStartTitle}</p>
            <p className="mt-1 text-neutral-600">{m.coldStartBody}</p>
            {loading && (
              <p className="mt-1 font-mono text-xs text-neutral-500">{m.coldStartWaking}</p>
            )}
          </div>
        </div>
      )}

      {/* Pipeline-down banner */}
      {!error && data?.is_stale && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4">
          <span className="mt-0.5 text-lg text-rose-500">⚠</span>
          <div className="text-sm">
            <p className="font-semibold text-rose-700">{m.staleTitle}</p>
            <p className="mt-1 text-rose-600/80">
              {m.staleDetail
                .replace("{age}", formatAge(data.snapshot_age_minutes, m))
                .replace("{snapshot}", data.snapshot_at ?? "—")}
            </p>
          </div>
        </div>
      )}

      {error ? (
        <div className="card mt-8 rounded-3xl p-10 text-center">
          <p className="text-neutral-700">{m.error}</p>
          <p className="mt-1 text-sm text-neutral-400">
            {error === "timeout" ? m.timeoutHint : error}
          </p>
          <button
            onClick={refresh}
            className="mt-5 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
          >
            {m.retry}
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <StatCard value={loading ? "…" : data.total} label={m.total} />
            <StatCard value={loading ? "…" : data.ok_count} label={m.statusOk} tone="good" />
            <StatCard
              value={loading ? "…" : data.stale_count}
              label={m.statusStaleData}
              tone={data && data.stale_count > 0 ? "warn" : "neutral"}
            />
            <StatCard
              value={loading ? "…" : data.missing_count}
              label={m.statusMissing}
              tone={data && data.missing_count > 0 ? "bad" : "neutral"}
            />
          </div>

          {!loading && data && (
            <div className="mt-5">
              <HealthBar ok={data.ok_count} total={data.total} />
            </div>
          )}

          {/* Live pipeline stage (PL1/PL2/PL3 from Airflow) */}
          <div className="mt-8">
            <PipelineStatus m={m} />
          </div>

          {/* Map */}
          {!loading && data && (
            <div className="mt-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-neutral-950">{m.mapTitle}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {m.statusOk}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    {m.statusStaleData}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    {m.statusMissing}
                  </span>
                </div>
              </div>
              <div className="card overflow-hidden rounded-3xl p-1.5">
                <StationMap stations={data.stations} lang={lang} m={m} onSelect={setSelected} />
              </div>
              <p className="mt-2 text-xs text-neutral-400">{m.mapHint}</p>
            </div>
          )}

          {/* Controls */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    filter === f.id
                      ? "bg-neutral-950 text-white"
                      : "card-thin text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  {f.label}
                  {typeof f.count === "number" && (
                    <span className="ml-1.5 tabular-nums opacity-60">{f.count}</span>
                  )}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={m.searchPlaceholder}
              className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-black/30 sm:w-64"
            />
          </div>

          {/* Table — click a row for the station's history */}
          <div className="card mt-5 overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/8 text-xs font-mono uppercase tracking-wider text-neutral-400">
                    <th className="px-5 py-3 font-medium">{m.colStatus}</th>
                    <th className="px-5 py-3 font-medium">{m.colStation}</th>
                    <th className="hidden px-5 py-3 font-medium sm:table-cell">{m.colArea}</th>
                    <th className="hidden px-5 py-3 font-medium md:table-cell">{m.colType}</th>
                    <th className="px-5 py-3 text-right font-medium">{m.colAqi}</th>
                    <th className="hidden px-5 py-3 text-right font-medium lg:table-cell">
                      {m.colLastRecorded}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-neutral-400">
                        {m.loading}
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-neutral-400">
                        {m.noResults}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => {
                      const st = STATUS[s.status] || STATUS.missing;
                      return (
                        <tr
                          key={s.station_id}
                          onClick={() => setSelected(s)}
                          className={`cursor-pointer transition-colors hover:bg-black/[0.03] ${st.row}`}
                        >
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.badge}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                              {statusLabel(s.status, m)}
                            </span>
                          </td>
                          <td className="px-5 py-3 font-mono text-xs text-neutral-600">
                            {s.station_id}
                          </td>
                          <td className="hidden max-w-xs truncate px-5 py-3 text-neutral-700 sm:table-cell">
                            {areaOf(s)}
                          </td>
                          <td className="hidden px-5 py-3 text-neutral-500 md:table-cell">
                            {s.station_type || "—"}
                          </td>
                          <td className="px-5 py-3 text-right tabular-nums text-neutral-700">
                            {s.last_aqi ?? "—"}
                          </td>
                          <td className="hidden px-5 py-3 text-right font-mono text-xs text-neutral-400 lg:table-cell">
                            {s.last_recorded_at ?? "—"}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-neutral-400">{m.howItWorks}</p>
        </>
      )}

      {/* Detail modal */}
      {selected && (
        <StationDetail station={selected} lang={lang} m={m} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
