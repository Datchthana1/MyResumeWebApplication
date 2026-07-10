"use client";

/**
 * The Ascent — a scroll-scrubbed walk through human evolution.
 *
 * One articulated stick figure walks a horizon from left to right as the reader
 * scrolls this (tall, sticky) section. Two things are bound to a single scroll
 * progress `p` ∈ [0,1], which makes the whole thing perfectly reversible:
 *
 *   1. MORPH  — the skeleton is interpolated between five keyframe poses
 *               (tailless ape → Homo sapiens), so posture changes continuously.
 *   2. STRIDE — the walk-cycle phase is `p × strides × 2π`, so the legs actually
 *               swing forward as you scroll down and backward as you scroll up.
 *
 * Behind the walker trails a comet-tail of its former selves — the figure
 * evaluated at slightly earlier `p` values — which reads as the lineage without
 * a busy static line-up. A mono odometer counts the years-ago down to "Today".
 *
 * No animation library: progress is derived from the section's position in the
 * viewport (rAF-throttled), and every visual is a pure function of it.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/providers/LanguageProvider";

// ---- Skeleton keyframes -----------------------------------------------------
// One figure lives in a local 44×64 box, feet on the ground line at y≈61,
// facing right. Each stage is a set of named joints; arms hang from `neck`,
// legs from `hip`. Interpolating these joint-for-joint gives a clean morph.
// `years` drives the odometer; the last stage carries the curiosity spark.
const STAGES = [
  {
    key: "ape",
    years: 20_000_000,
    hip: [17, 41], neck: [26, 35], head: [34, 34, 5.2],
    armFront: [[31, 46], [33, 61]], armBack: [[23, 46], [21, 61]], // reach the ground
    legFront: [[22, 51], [25, 61]], legBack: [[13, 51], [11, 61]],
  },
  {
    key: "afarensis",
    years: 4_000_000,
    hip: [17, 39], neck: [21, 27], head: [24, 21, 5.1],
    armFront: [[26, 34], [28, 44]], armBack: [[16, 34], [14, 44]],
    legFront: [[22, 50], [25, 61]], legBack: [[13, 50], [11, 61]],
  },
  {
    key: "habilis",
    years: 2_300_000,
    hip: [17, 38], neck: [20, 23], head: [22, 16.5, 5.0],
    armFront: [[25, 31], [27, 42]], armBack: [[15, 31], [13, 42]],
    legFront: [[22, 49], [25, 61]], legBack: [[13, 49], [11, 61]],
  },
  {
    key: "erectus",
    years: 1_800_000,
    hip: [17, 37], neck: [18.5, 20], head: [20, 13, 4.9],
    armFront: [[24, 29], [26, 40]], armBack: [[13, 29], [11, 39]],
    legFront: [[23, 48], [27, 61]], legBack: [[12, 48], [9, 61]],
  },
  {
    key: "sapiens",
    years: 0,
    spark: [26, 2],
    hip: [17, 36], neck: [18, 18], head: [19, 11, 4.9],
    armFront: [[24, 28], [26, 39]], armBack: [[13, 28], [11, 38]],
    legFront: [[24, 47], [28, 61]], legBack: [[12, 47], [8, 61]],
  },
];
const N = STAGES.length;
const FOOT_Y = 61; // local y of the ground contact
const STRIDES = 7; // leg swings across a full scroll

// Scene geometry (SVG user units).
const SCENE_W = 1000;
const SCENE_H = 300;
const GROUND_Y = 250;
const MARGIN = 96;
const SCALE = 2.25;

const TWO_PI = Math.PI * 2;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const lerpPt = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const smoothstep = (x) => {
  const c = clamp(x, 0, 1);
  return c * c * (3 - 2 * c);
};

function rotate([x, y], [ox, oy], deg) {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a), s = Math.sin(a);
  const dx = x - ox, dy = y - oy;
  return [ox + dx * c - dy * s, oy + dx * s + dy * c];
}

// Interpolated + strided skeleton at progress `p`. `walk:false` freezes the
// gait (used for the reduced-motion line-up).
function poseAt(p, walk = true) {
  const t = clamp(p, 0, 1) * (N - 1);
  const i = Math.min(N - 2, Math.floor(t));
  const f = t - i;
  const A = STAGES[i], B = STAGES[i + 1];

  let hip = lerpPt(A.hip, B.hip, f);
  const neck = lerpPt(A.neck, B.neck, f);
  const head = [lerp(A.head[0], B.head[0], f), lerp(A.head[1], B.head[1], f), lerp(A.head[2], B.head[2], f)];
  let aF = [lerpPt(A.armFront[0], B.armFront[0], f), lerpPt(A.armFront[1], B.armFront[1], f)];
  let aB = [lerpPt(A.armBack[0], B.armBack[0], f), lerpPt(A.armBack[1], B.armBack[1], f)];
  let lF = [lerpPt(A.legFront[0], B.legFront[0], f), lerpPt(A.legFront[1], B.legFront[1], f)];
  let lB = [lerpPt(A.legBack[0], B.legBack[0], f), lerpPt(A.legBack[1], B.legBack[1], f)];

  let bob = 0;
  if (walk) {
    const phase = p * TWO_PI * STRIDES;
    const sw = Math.sin(phase);
    const legAmp = 15, armAmp = 10;
    // legs swing about the hip, arms about the neck, in opposition.
    lF = lF.map((pt) => rotate(pt, hip, legAmp * sw));
    lB = lB.map((pt) => rotate(pt, hip, -legAmp * sw));
    aF = aF.map((pt) => rotate(pt, neck, -armAmp * sw));
    aB = aB.map((pt) => rotate(pt, neck, armAmp * sw));
    bob = -Math.abs(Math.cos(phase)) * 1.4; // body rises on each mid-stride
  }

  // spark ignites only across the final segment
  const sparkOpacity = i === N - 2 ? smoothstep((f - 0.35) / 0.65) : 0;
  return { hip, neck, head, aF, aB, lF, lB, bob, sparkOpacity, spark: STAGES[N - 1].spark };
}

const path2 = (a, b) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;
const path3 = (a, b, c) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]}`;

// One figure, drawn from an already-posed skeleton. Stroke-only so it stays a
// clean "stick man"; strokes don't scale so lines stay crisp at any figure size.
function Figure({ pose, opacity = 1, sw = 2.4, showSpark = true }) {
  const { hip, neck, head, aF, aB, lF, lB, spark, sparkOpacity } = pose;
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      vectorEffect="non-scaling-stroke"
    >
      <path d={path2(hip, neck)} vectorEffect="non-scaling-stroke" />
      <path d={path3(neck, aB[0], aB[1])} vectorEffect="non-scaling-stroke" />
      <path d={path3(neck, aF[0], aF[1])} vectorEffect="non-scaling-stroke" />
      <path d={path3(hip, lB[0], lB[1])} vectorEffect="non-scaling-stroke" />
      <path d={path3(hip, lF[0], lF[1])} vectorEffect="non-scaling-stroke" />
      <circle cx={head[0]} cy={head[1]} r={head[2]} vectorEffect="non-scaling-stroke" />
      {showSpark && spark && sparkOpacity > 0.01 && (
        <path
          d={`M${spark[0]} ${spark[1]} l1.5 3.2 3.2 1.5 -3.2 1.5 -1.5 3.2 -1.5 -3.2 -3.2 -1.5 3.2 -1.5 z`}
          fill="var(--accent)"
          stroke="none"
          opacity={sparkOpacity}
        />
      )}
    </g>
  );
}

// Places a figure on the horizon at horizontal fraction `xf` ∈ [0,1].
function placed(pose, xf) {
  const x = MARGIN + xf * (SCENE_W - 2 * MARGIN);
  const y = GROUND_Y - FOOT_Y * SCALE + (pose.bob || 0) * SCALE;
  return `translate(${x} ${y}) scale(${SCALE})`;
}

function fmtYears(v) {
  const r = v >= 1_000_000 ? Math.round(v / 10_000) * 10_000 : Math.round(v / 1_000) * 1_000;
  return r.toLocaleString("en-US");
}

export default function EvolutionScroll() {
  const { t } = useLang();
  const A = t.ascent;
  const outerRef = useRef(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    setReduced(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = outerRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, Math.max(total, 1));
      setP(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const active = Math.min(N - 1, Math.round(p * (N - 1)));
  const stage = A.stages[active];
  const pct = Math.round(p * 100);

  // years-ago, interpolated per segment for a live "odometer" feel
  const yearsLabel = useMemo(() => {
    const t2 = clamp(p, 0, 1) * (N - 1);
    const i = Math.min(N - 2, Math.floor(t2));
    const f = t2 - i;
    const v = lerp(STAGES[i].years, STAGES[i + 1].years, f);
    return p > 0.985 || v < 6000 ? null : fmtYears(v);
  }, [p]);

  // main walker + a trailing lineage of former selves
  const main = poseAt(p);
  const ghosts = [];
  for (let k = 1; k <= 5; k++) {
    const gp = p - k * 0.05;
    if (gp <= 0.001) break;
    ghosts.push({ pose: poseAt(gp), xf: gp, opacity: 0.16 * (1 - k / 6) });
  }

  // --- Reduced motion: a static, labelled line-up, no scrubbing --------------
  if (reduced) {
    return (
      <section id="ascent" aria-label={A.lead} className="relative mx-auto max-w-6xl px-6 py-16">
        <p className="kicker mb-3 flex items-center gap-2">
          <span className="signal-dot" /> {A.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
          {A.lead}
        </h2>
        <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="mt-8 w-full text-neutral-900" role="img" aria-label={A.lead}>
          <line x1={MARGIN * 0.5} y1={GROUND_Y} x2={SCENE_W - MARGIN * 0.5} y2={GROUND_Y} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
          {STAGES.map((s, i) => {
            const xf = i / (N - 1);
            return (
              <g key={s.key} transform={placed(poseAt(xf, false), xf)}>
                <Figure pose={poseAt(xf, false)} />
              </g>
            );
          })}
        </svg>
        <ol className="mt-6 grid gap-4 sm:grid-cols-5">
          {A.stages.map((s) => (
            <li key={s.name}>
              <p className="font-display text-sm font-semibold text-neutral-900">{s.name}</p>
              <p className="mt-0.5 text-xs italic text-neutral-400">{s.latin}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={outerRef} id="ascent" aria-label={A.lead} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* ground-up light: a faint horizon glow so the scene sits in space */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 96%, var(--accent-soft), transparent 60%), linear-gradient(to bottom, #ffffff, #fbfbfd 60%, #f4f5f8)",
          }}
        />

        {/* header + narration */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 sm:pt-28">
          <div className="flex items-center justify-between">
            <p className="kicker flex items-center gap-2">
              <span className="signal-dot" /> {A.eyebrow}
            </p>
            <p className="font-mono text-xs tabular-nums text-neutral-400">
              {String(pct).padStart(2, "0")}
              <span className="text-neutral-300">/100</span>
            </p>
          </div>

          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-neutral-950 sm:text-6xl">
            {A.lead}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-neutral-500">{A.sub}</p>
        </div>

        {/* odometer + current stage — the narration that scrubs with scroll */}
        <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 items-end gap-6 px-6 sm:grid-cols-[auto_1fr]">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-5xl font-medium tabular-nums leading-none tracking-tight text-neutral-950 sm:text-7xl">
                {yearsLabel ?? A.present}
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              {yearsLabel ? A.unit : " "}
            </p>
          </div>

          <div key={active} className="animate-fadeInUp sm:justify-self-end sm:text-right">
            <p className="font-display text-2xl font-semibold text-neutral-950">{stage.name}</p>
            <p className="mt-0.5 text-sm italic text-neutral-400">{stage.latin}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500 sm:ml-auto">
              {stage.note}
            </p>
          </div>
        </div>

        {/* the horizon + the walking, morphing figure */}
        <div className="relative mt-auto w-full">
          <svg
            viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
            className="block h-[42vh] w-full text-neutral-900"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden
          >
            {/* full horizon (faint) */}
            <line x1={MARGIN * 0.5} y1={GROUND_Y} x2={SCENE_W - MARGIN * 0.5} y2={GROUND_Y} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="round" />
            {/* travelled horizon (the blue signal) — fills up to the walker */}
            <line
              x1={MARGIN * 0.5}
              y1={GROUND_Y}
              x2={MARGIN + p * (SCENE_W - 2 * MARGIN)}
              y2={GROUND_Y}
              stroke="var(--accent)"
              strokeOpacity="0.65"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* era ticks */}
            {STAGES.map((s, i) => {
              const x = MARGIN + (i / (N - 1)) * (SCENE_W - 2 * MARGIN);
              const on = i <= active;
              return (
                <line
                  key={s.key}
                  x1={x}
                  y1={GROUND_Y - 5}
                  x2={x}
                  y2={GROUND_Y + 5}
                  stroke={on ? "var(--accent)" : "currentColor"}
                  strokeOpacity={on ? 0.7 : 0.2}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}

            {/* lineage trailing behind */}
            {ghosts.map((g, i) => (
              <g key={i} transform={placed(g.pose, g.xf)}>
                <Figure pose={g.pose} opacity={g.opacity} sw={2} showSpark={false} />
              </g>
            ))}
            {/* the walker */}
            <g transform={placed(main, p)}>
              <Figure pose={main} />
            </g>
          </svg>

          {/* scroll hint — fades out once you start */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center transition-opacity duration-500"
            style={{ opacity: p > 0.02 ? 0 : 1 }}
          >
            <span className="animate-floaty font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              ↓ {A.scrollHint}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
