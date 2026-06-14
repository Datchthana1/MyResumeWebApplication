"use client";

import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "@/components/monitorApi";
import LineChart from "@/components/LineChart";

// Metric catalogue. Keys match the get_station_history RPC columns.
const METRICS = {
  air4thai: [
    { key: "aqi", label: "AQI", unit: "", color: "#0ea5e9" },
    { key: "pm25", label: "PM2.5", unit: "µg/m³", color: "#10b981" },
    { key: "pm10", label: "PM10", unit: "µg/m³", color: "#10b981" },
    { key: "o3", label: "O₃", unit: "ppb", color: "#10b981" },
    { key: "co", label: "CO", unit: "ppm", color: "#10b981" },
    { key: "no2", label: "NO₂", unit: "ppb", color: "#10b981" },
    { key: "so2", label: "SO₂", unit: "ppb", color: "#10b981" },
  ],
  ow: [
    { key: "ow_aqi", label: "OW AQI", unit: "(1–5)", color: "#6366f1" },
    { key: "ow_pm25", label: "OW PM2.5", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_pm10", label: "OW PM10", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_o3", label: "OW O₃", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_no2", label: "OW NO₂", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_so2", label: "OW SO₂", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_co", label: "OW CO", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_nh3", label: "OW NH₃", unit: "µg/m³", color: "#6366f1" },
    { key: "ow_temp", label: "Temp", unit: "°C", color: "#f97316" },
    { key: "ow_feels_like", label: "Feels", unit: "°C", color: "#f97316" },
    { key: "ow_humidity", label: "Humidity", unit: "%", color: "#0ea5e9" },
    { key: "ow_pressure", label: "Pressure", unit: "hPa", color: "#64748b" },
    { key: "ow_wind_speed", label: "Wind", unit: "m/s", color: "#0891b2" },
    { key: "ow_clouds", label: "Clouds", unit: "%", color: "#64748b" },
  ],
};

const ALL_METRICS = [...METRICS.air4thai, ...METRICS.ow];

const num = (v) => (v == null || v === "" ? null : Number(v));

// Thai AQI 5-level air-quality bands.
function aqiBand(a, lang) {
  if (a == null || Number.isNaN(a))
    return { label: "—", cls: "bg-neutral-100 text-neutral-400" };
  if (a <= 25) return { label: lang === "th" ? "ดีมาก" : "Very good", cls: "bg-sky-100 text-sky-700" };
  if (a <= 50) return { label: lang === "th" ? "ดี" : "Good", cls: "bg-emerald-100 text-emerald-700" };
  if (a <= 100) return { label: lang === "th" ? "ปานกลาง" : "Moderate", cls: "bg-amber-100 text-amber-700" };
  if (a <= 200) return { label: lang === "th" ? "เริ่มมีผลต่อสุขภาพ" : "Unhealthy", cls: "bg-orange-100 text-orange-700" };
  return { label: lang === "th" ? "มีผลต่อสุขภาพ" : "Very unhealthy", cls: "bg-rose-100 text-rose-700" };
}

function chartLabel(bucket, granularity) {
  if (!bucket) return "";
  if (granularity === "month") return bucket; // YYYY-MM
  return bucket.slice(5); // drop year: "06-14" or "06-14 13:00"
}

const fmtCell = (v) => {
  const n = num(v);
  if (n == null || Number.isNaN(n)) return "—";
  return Number.isInteger(n) ? n : n;
};

export default function StationDetail({ station, lang = "en", m, onClose }) {
  const [granularity, setGranularity] = useState("day");
  const [metricKey, setMetricKey] = useState("aqi");
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const areaName =
    (lang === "th" ? station.area_th || station.area_en : station.area_en || station.area_th) ||
    station.station_id;

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 75_000);

    fetch(
      `${API_BASE}/api/stations/${encodeURIComponent(station.station_id)}/history?granularity=${granularity}`,
      { signal: ctrl.signal, cache: "no-store" },
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        if (!cancelled) setPoints(j.points || []);
      })
      .catch((e) => {
        if (!cancelled) setError(e.name === "AbortError" ? "timeout" : e.message);
      })
      .finally(() => {
        clearTimeout(timer);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [station.station_id, granularity]);

  const metric = ALL_METRICS.find((x) => x.key === metricKey) || ALL_METRICS[0];

  const chartPoints = useMemo(
    () => points.map((p) => ({ label: chartLabel(p.bucket, granularity), value: num(p[metricKey]) })),
    [points, metricKey, granularity],
  );

  const grans = [
    { id: "hour", label: m.granHour },
    { id: "day", label: m.granDay },
    { id: "month", label: m.granMonth },
  ];

  // Table columns: bucket + every metric, with an air-quality badge after AQI.
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="card my-auto w-full max-w-5xl rounded-3xl p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-950 sm:text-2xl">{areaName}</h2>
            <p className="mt-1 font-mono text-xs text-neutral-400">
              {station.station_id}
              {station.station_type ? ` · ${station.station_type}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={m.close}
            className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-black/5 hover:text-neutral-900"
          >
            ✕
          </button>
        </div>

        {/* Granularity */}
        <div className="mt-5 flex flex-wrap gap-2">
          {grans.map((g) => (
            <button
              key={g.id}
              onClick={() => setGranularity(g.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                granularity === g.id
                  ? "bg-neutral-950 text-white"
                  : "card-thin text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Metric tabs */}
        <div className="mt-4 space-y-2">
          <MetricRow
            title={m.groupAir4thai}
            items={METRICS.air4thai}
            active={metricKey}
            onPick={setMetricKey}
          />
          <MetricRow
            title={m.groupOpenWeather}
            items={METRICS.ow}
            active={metricKey}
            onPick={setMetricKey}
          />
        </div>

        {/* Chart */}
        <div className="mt-5 rounded-2xl border border-black/5 p-3">
          <div className="mb-1 flex items-center justify-between px-1">
            <span className="text-sm font-medium text-neutral-700">
              {metric.label}
              {metric.unit ? ` (${metric.unit})` : ""}
            </span>
            <span className="font-mono text-xs text-neutral-400">{m[`gran${cap(granularity)}`]}</span>
          </div>
          {loading ? (
            <div className="flex h-[280px] items-center justify-center text-sm text-neutral-400">
              {m.loading}
            </div>
          ) : error ? (
            <div className="flex h-[280px] items-center justify-center text-sm text-neutral-400">
              {m.error}
            </div>
          ) : (
            <LineChart points={chartPoints} color={metric.color} unit={metric.unit} />
          )}
        </div>

        {/* Table */}
        <h3 className="mb-2 mt-6 text-sm font-semibold text-neutral-700">{m.tableHistory}</h3>
        <div className="card overflow-hidden rounded-2xl">
          <div className="max-h-[360px] overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-black/8 font-mono uppercase tracking-wider text-neutral-400">
                  <th className="whitespace-nowrap px-3 py-2.5 font-medium">{m.colDate}</th>
                  <th className="px-3 py-2.5 text-right font-medium">AQI</th>
                  <th className="px-3 py-2.5 font-medium">{m.airQuality}</th>
                  {ALL_METRICS.filter((x) => x.key !== "aqi").map((x) => (
                    <th key={x.key} className="whitespace-nowrap px-3 py-2.5 text-right font-medium">
                      {x.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (
                  <tr>
                    <td colSpan={ALL_METRICS.length + 2} className="px-3 py-10 text-center text-neutral-400">
                      {m.loading}
                    </td>
                  </tr>
                ) : points.length === 0 ? (
                  <tr>
                    <td colSpan={ALL_METRICS.length + 2} className="px-3 py-10 text-center text-neutral-400">
                      {m.detailNoData}
                    </td>
                  </tr>
                ) : (
                  [...points].reverse().map((p) => {
                    const band = aqiBand(num(p.aqi), lang);
                    return (
                      <tr key={p.bucket} className="hover:bg-black/[0.02]">
                        <td className="whitespace-nowrap px-3 py-2.5 font-mono text-neutral-600">
                          {p.bucket}
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-neutral-800">
                          {fmtCell(p.aqi)}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${band.cls}`}>
                            {band.label}
                          </span>
                        </td>
                        {ALL_METRICS.filter((x) => x.key !== "aqi").map((x) => (
                          <td key={x.key} className="px-3 py-2.5 text-right tabular-nums text-neutral-600">
                            {fmtCell(p[x.key])}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ title, items, active, onPick }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 w-full text-[10px] font-mono uppercase tracking-widest text-neutral-400 sm:w-auto">
        {title}
      </span>
      {items.map((x) => (
        <button
          key={x.key}
          onClick={() => onPick(x.key)}
          className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${
            active === x.key
              ? "bg-neutral-900 text-white"
              : "bg-black/5 text-neutral-600 hover:bg-black/10 hover:text-neutral-900"
          }`}
        >
          {x.label}
        </button>
      ))}
    </div>
  );
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
