"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StatCard, StatusDot, formatAge } from "@/components/monitor/Monitor";

const FETCH_TIMEOUT_MS = 15_000;
const POLL_MS = 60_000;

function useEarthquakeData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setError(null);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(`/api/earthquake`, { signal: ctrl.signal, cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
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
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  return { data, loading, error, lastFetched, refresh: load };
}

// Source-freshness tone: this answers "is the pipeline actually reaching
// Supabase", independent of whether a quake happened recently.
const SOURCE_STYLE = {
  live: { tone: "good" },
  stale: { tone: "warn" },
  offline: { tone: "bad" },
  unconfigured: { tone: "bad" },
};

function sourceLabel(status, m) {
  if (status === "live") return m.eqSourceLive;
  if (status === "stale") return m.eqSourceStale;
  if (status === "unconfigured") return m.eqSourceUnconfigured;
  return m.eqSourceOffline;
}

// TMD-ish magnitude bands -> badge tone.
function magnitudeTone(mag) {
  if (mag == null) return "bg-neutral-100 text-neutral-400";
  if (mag < 3) return "bg-neutral-100 text-neutral-600";
  if (mag < 4) return "bg-sky-50 text-sky-700";
  if (mag < 5) return "bg-amber-50 text-amber-700";
  if (mag < 6) return "bg-orange-50 text-orange-700";
  return "bg-rose-50 text-rose-700";
}

function locationOf(ev, lang) {
  if (lang !== "th") return ev.location_en || ev.title_th || "—";
  const parts = [
    ev.tambon_th && `ต.${ev.tambon_th}`,
    ev.amphoe_th && `อ.${ev.amphoe_th}`,
    ev.province_th && `จ.${ev.province_th}`,
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : ev.title_th || ev.location_en || "—";
}

export function EarthquakeBoard({ lang, m }) {
  const { data, loading, error, lastFetched, refresh } = useEarthquakeData();
  const source = data?.source;
  const sourceStyle = SOURCE_STYLE[source?.status] || SOURCE_STYLE.offline;
  const events = data?.events ?? [];

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            {m.eqEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
            {m.eqTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-500">{m.eqSubtitle}</p>
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

      {/* Data-source freshness — is it actually reaching Supabase? */}
      <div className="card mt-6 rounded-3xl p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <StatusDot tone={sourceStyle.tone} />
            <span className="text-sm font-medium text-neutral-800">
              {loading && !data ? m.loading : sourceLabel(source?.status, m)}
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {m.checkedLabel}: {lastFetched ? lastFetched.toLocaleTimeString() : "—"}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-neutral-400">
          <span>
            {m.eqLastFetch}: {source?.last_fetch_at ?? "—"}
          </span>
          {source?.fetch_age_minutes != null && (
            <span>
              {m.eqFetchAge}: {formatAge(source.fetch_age_minutes, m)}
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-neutral-400">{m.eqSourceExplain}</p>
      </div>

      {error ? (
        <div className="card mt-6 rounded-3xl p-10 text-center">
          <p className="text-neutral-700">{m.eqError}</p>
          <p className="mt-1 text-sm text-neutral-400">{error === "timeout" ? m.timeoutHint : error}</p>
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
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <StatCard value={loading ? "…" : data?.stats?.total_24h ?? 0} label={m.eqStat24h} />
            <StatCard
              value={loading ? "…" : data?.stats?.domestic_24h ?? 0}
              label={m.eqStatDomestic24h}
              tone={data?.stats?.domestic_24h > 0 ? "warn" : "neutral"}
            />
            <StatCard
              value={loading ? "…" : formatAge(data?.stats?.latest_event_age_minutes, m)}
              label={m.eqStatLatestEvent}
            />
          </div>

          {/* Recent events table */}
          <div className="card mt-5 overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/8 text-xs font-mono uppercase tracking-wider text-neutral-400">
                    <th className="px-5 py-3 font-medium">{m.eqColDatetime}</th>
                    <th className="px-5 py-3 text-right font-medium">{m.eqColMagnitude}</th>
                    <th className="hidden px-5 py-3 text-right font-medium sm:table-cell">
                      {m.eqColDepth}
                    </th>
                    <th className="px-5 py-3 font-medium">{m.eqColLocation}</th>
                    <th className="hidden px-5 py-3 font-medium md:table-cell">{m.eqColOrigin}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-neutral-400">
                        {m.loading}
                      </td>
                    </tr>
                  ) : events.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-neutral-400">
                        {m.eqNoResults}
                      </td>
                    </tr>
                  ) : (
                    events.map((ev, i) => (
                      <tr
                        key={`${ev.datetime_utc}-${ev.lat}-${ev.lon}-${i}`}
                        className="transition-colors hover:bg-black/[0.03]"
                      >
                        <td className="px-5 py-3 font-mono text-xs text-neutral-600">
                          {ev.datetime_thai ?? ev.datetime_utc ?? "—"}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${magnitudeTone(ev.magnitude)}`}
                          >
                            {ev.magnitude ?? "—"}
                          </span>
                        </td>
                        <td className="hidden px-5 py-3 text-right tabular-nums text-neutral-500 sm:table-cell">
                          {ev.depth_km != null ? `${ev.depth_km} ${m.eqUnitKm}` : "—"}
                        </td>
                        <td className="max-w-xs truncate px-5 py-3 text-neutral-700">
                          {locationOf(ev, lang)}
                        </td>
                        <td className="hidden px-5 py-3 md:table-cell">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              ev.is_domestic
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-neutral-100 text-neutral-500"
                            }`}
                          >
                            {ev.is_domestic ? m.eqDomestic : m.eqForeign}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EarthquakeBoard;
