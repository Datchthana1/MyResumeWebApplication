"use client";

import { useRef, useState } from "react";

/**
 * Minimal dependency-free SVG line chart for a single metric.
 *
 * props:
 *   points: [{ label: string, value: number|null }]  (oldest -> newest)
 *   color:  stroke/fill colour
 *   unit:   appended to the hovered value in the tooltip
 */
export default function LineChart({ points = [], color = "#10b981", unit = "", height = 280 }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  // W is tuned close to the real rendered width (chart sits in a max-w-6xl
  // modal) so preserveAspectRatio="none" stretches by ~1× — keeps text and
  // dots from distorting while letting the chart fill the full width.
  const W = 1080;
  const H = height;
  const padL = 40;
  const padR = 14;
  const padT = 18;
  const padB = 40;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const vals = points.map((p) => p.value).filter((v) => v != null && !Number.isNaN(v));

  if (points.length === 0 || vals.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl bg-black/[0.02] text-sm text-neutral-400"
        style={{ height }}
      >
        —
      </div>
    );
  }

  let min = Math.min(...vals);
  let max = Math.max(...vals);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const span = max - min;
  min -= span * 0.12;
  max += span * 0.12;

  const xAt = (i) =>
    points.length === 1 ? padL + innerW / 2 : padL + (i / (points.length - 1)) * innerW;
  const yAt = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;

  // Build the line, breaking it across null gaps.
  let path = "";
  let pen = false;
  points.forEach((p, i) => {
    if (p.value == null || Number.isNaN(p.value)) {
      pen = false;
      return;
    }
    path += `${pen ? "L" : "M"}${xAt(i).toFixed(1)} ${yAt(p.value).toFixed(1)} `;
    pen = true;
  });

  // Y-axis ticks (5 levels).
  const ticks = Array.from({ length: 5 }, (_, k) => min + (k / 4) * (max - min));

  // X labels: show all when few, otherwise thin them out.
  const xStep = Math.max(1, Math.ceil(points.length / 8));

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const xv = ((e.clientX - rect.left) / rect.width) * W;
    let idx = Math.round(((xv - padL) / innerW) * (points.length - 1));
    idx = Math.max(0, Math.min(points.length - 1, idx));
    setHover(idx);
  };

  const fmt = (v) =>
    v == null || Number.isNaN(v) ? "—" : Number.isInteger(v) ? v : v.toFixed(2).replace(/\.?0+$/, "");

  return (
    <div className="relative w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        {/* gridlines + y labels */}
        {ticks.map((tv, k) => {
          const y = yAt(tv);
          return (
            <g key={k}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#00000010" strokeWidth="1" />
              <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">
                {fmt(Math.round(tv * 10) / 10)}
              </text>
            </g>
          );
        })}

        {/* x labels */}
        {points.map((p, i) =>
          i % xStep === 0 || i === points.length - 1 ? (
            <text
              key={i}
              x={xAt(i)}
              y={H - padB + 20}
              textAnchor="middle"
              fontSize="11"
              fill="#9ca3af"
            >
              {p.label}
            </text>
          ) : null,
        )}

        {/* the line */}
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />

        {/* points */}
        {points.map((p, i) =>
          p.value == null || Number.isNaN(p.value) ? null : (
            <circle key={i} cx={xAt(i)} cy={yAt(p.value)} r={hover === i ? 5 : 3} fill={color} />
          ),
        )}

        {/* hover guide */}
        {hover != null && points[hover]?.value != null && (
          <line
            x1={xAt(hover)}
            y1={padT}
            x2={xAt(hover)}
            y2={padT + innerH}
            stroke={color}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.5"
          />
        )}
      </svg>

      {/* tooltip */}
      {hover != null && points[hover]?.value != null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
          style={{
            left: `${(xAt(hover) / W) * 100}%`,
            top: `${(yAt(points[hover].value) / H) * 100}%`,
          }}
        >
          <div className="font-mono text-[10px] text-white/60">{points[hover].label}</div>
          <div className="font-semibold tabular-nums">
            {fmt(points[hover].value)}
            {unit ? ` ${unit}` : ""}
          </div>
        </div>
      )}
    </div>
  );
}
