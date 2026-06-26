"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE } from "@/components/monitorApi";

// Render free tier can cold-start; give the request room.
const FETCH_TIMEOUT_MS = 75_000;
const POLL_MS = 30_000;

// State → presentation. `live` drives the pulsing ring on the running stage.
const STATE_STYLE = {
  running: { dot: "bg-accent", ring: "ring-accent", text: "text-accent", live: true },
  success: { dot: "bg-emerald-500", ring: "ring-emerald-400", text: "text-emerald-600", live: false },
  failed: { dot: "bg-rose-500", ring: "ring-rose-400", text: "text-rose-600", live: false },
  up_for_retry: { dot: "bg-amber-500", ring: "ring-amber-400", text: "text-amber-600", live: false },
  queued: { dot: "bg-amber-400", ring: "ring-amber-300", text: "text-amber-600", live: false },
  scheduled: { dot: "bg-amber-400", ring: "ring-amber-300", text: "text-amber-600", live: false },
  none: { dot: "bg-neutral-300", ring: "ring-neutral-200", text: "text-neutral-400", live: false },
  unconfigured: { dot: "bg-neutral-300", ring: "ring-neutral-200", text: "text-neutral-400", live: false },
  unauthorized: { dot: "bg-rose-400", ring: "ring-rose-300", text: "text-rose-500", live: false },
  error: { dot: "bg-rose-400", ring: "ring-rose-300", text: "text-rose-500", live: false },
};
const styleFor = (s) => STATE_STYLE[s] || STATE_STYLE.none;

export default function PipelineStatus({ m }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(0);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setError(null);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(`${API_BASE}/api/pipeline/status`, {
        signal: ctrl.signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
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

  const stages = data?.stages ?? [];
  const active = data?.active_stage ?? null;
  const stateLabel = (s) => m.pipelineStates?.[s] || s;

  return (
    <div className="card rounded-3xl p-6 sm:p-7">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              {m.pipelineEyebrow}
            </span>
          </div>
          <h2 className="mt-1 text-lg font-semibold text-neutral-950">{m.pipelineTitle}</h2>
          <p className="mt-0.5 text-sm text-neutral-500">{m.pipelineSubtitle}</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-1.5 text-xs text-neutral-700 transition-all hover:border-black/40 hover:text-black disabled:opacity-50"
        >
          <span className={loading ? "animate-spin" : ""}>↻</span>
          {loading ? m.loading : m.refresh}
        </button>
      </div>

      {/* Headline state */}
      <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-black/[0.03] px-4 py-3">
        {active ? (
          <>
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-medium text-neutral-800">
              {(m.pipelineActive || "{stage} is running now").replace("{stage}", active)}
            </span>
          </>
        ) : (
          <>
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="text-sm text-neutral-500">
              {data && !data.configured ? m.pipelineUnconfigured : m.pipelineIdle}
            </span>
          </>
        )}
      </div>

      {/* Stepper */}
      <div className="mt-6">
        <div className="flex items-center">
          {stages.map((st, i) => {
            const sty = styleFor(st.state);
            const isSel = selected === i;
            const isActive = active && st.id === active;
            return (
              <div key={st.id || i} className="flex flex-1 items-center last:flex-none">
                <button
                  onClick={() => setSelected(i)}
                  className="group flex flex-col items-center gap-2 focus:outline-none"
                  aria-label={`${st.id} ${st.name}`}
                >
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full ring-2 transition-all ${sty.ring} ${
                      isSel ? "scale-110 bg-white shadow-md" : "bg-white"
                    }`}
                  >
                    {sty.live && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
                    )}
                    <span className={`h-3 w-3 rounded-full ${sty.dot}`} />
                  </span>
                  <span className="flex flex-col items-center">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive ? "text-accent" : "text-neutral-700"
                      }`}
                    >
                      {st.id}
                    </span>
                    <span className="hidden max-w-[8rem] text-center text-[11px] leading-tight text-neutral-400 sm:block">
                      {st.name}
                    </span>
                  </span>
                </button>
                {/* connector */}
                {i < stages.length - 1 && (
                  <span className="mx-1 -mt-7 h-0.5 flex-1 rounded-full bg-gradient-to-r from-black/15 to-black/5 sm:mx-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected stage detail */}
        {stages[selected] && (
          <div className="mt-6 rounded-2xl border border-black/8 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-neutral-900">
                  {stages[selected].id}
                </span>
                <span className="text-sm text-neutral-500">· {stages[selected].name}</span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-2.5 py-0.5 text-xs font-medium ${styleFor(stages[selected].state).text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${styleFor(stages[selected].state).dot}`} />
                {stateLabel(stages[selected].state)}
              </span>
            </div>
            {stages[selected].description && (
              <p className="mt-2 text-sm text-neutral-600">{stages[selected].description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-neutral-400">
              {stages[selected].dag_id && <span>dag: {stages[selected].dag_id}</span>}
              {stages[selected].last_run_at && (
                <span>
                  {m.pipelineLastRun}: {stages[selected].last_run_at}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footnotes */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
        <span>{m.pipelineClickHint}</span>
        {error ? (
          <span className="text-rose-500">{error === "timeout" ? m.timeoutHint : m.error}</span>
        ) : data && !data.configured ? (
          <span>{m.pipelineNotLinked}</span>
        ) : data?.checked_at ? (
          <span className="font-mono">
            {m.checkedLabel}: {data.checked_at}
          </span>
        ) : null}
      </div>
    </div>
  );
}
