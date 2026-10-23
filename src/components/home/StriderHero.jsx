"use client";

/**
 * StriderHero — the signature of the rebuild.
 *
 * A single horizon holds the whole idea: faint ancestors trail in from the left
 * (the giants whose shoulders we stand on), an ember of curiosity ignites, and a
 * Homo sapiens is *drawn line-by-line* into being, then walks on forever with the
 * spark glinting overhead. It says the thesis of the site — "curiosity is what
 * evolved us, and it never stops" — before a word is read.
 *
 * Pure SVG + CSS. The line-draw uses `pathLength="1"` so every stroke animates
 * uniformly regardless of its real length. Reduced motion settles on the fully
 * drawn, still figure (the reduced-motion rule in globals.css snaps it to the
 * end state).
 */

import { useLang } from "@/providers/LanguageProvider";

// ── Lineage (faint, trailing) ────────────────────────────────────────────────
// Five stages in a shared 40×60 box, feet on the ground at y≈58, facing right.
// Stroke-only "stick" ancestors — deliberately quiet so the modern human leads.
const LINEAGE = [
  {
    anim: "evo-ape",
    head: { cx: 28, cy: 31, r: 3.8 },
    limbs: [
      "M16 42 L25 34",
      "M25 35 L30 48 L32 57",
      "M24 36 L20 48 L19 57",
      "M16 42 L13 51 L11 58",
      "M16 42 L20 51 L23 58",
    ],
  },
  {
    anim: "evo-knuckle",
    head: { cx: 25.5, cy: 22, r: 3.9 },
    limbs: [
      "M16 40 L23 26",
      "M23 27 L28 42 L30 54",
      "M22 28 L16 37",
      "M16 40 L12 50 L10 58",
      "M16 40 L21 50 L24 58",
    ],
  },
  {
    anim: "evo-first",
    head: { cx: 22.5, cy: 15.5, r: 4.1 },
    limbs: [
      "M17 38 L21 20",
      "M21 21 L27 30",
      "M21 21 L14 28",
      "M17 38 L12 49 L9 58",
      "M17 38 L23 48 L26 58",
    ],
  },
  {
    anim: "evo-erectus",
    head: { cx: 20.5, cy: 12, r: 4.3 },
    limbs: [
      "M17 37 L19.5 17",
      "M19 18 L26 24",
      "M19 18 L11 22",
      "M17 37 L11 48 L7 57",
      "M17 37 L24 47 L28 57",
    ],
  },
];

function LineageFigure({ limbs, head }) {
  return (
    <g
      fill="none"
      stroke="var(--ink)"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {limbs.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <circle cx={head.cx} cy={head.cy} r={head.r} />
    </g>
  );
}

// ── The modern human (the lead) ──────────────────────────────────────────────
// A larger, cleaner strider in a 62×122 box, feet at y≈116. Each stroke draws
// in sequence (legs → spine → arms → head); then the whole figure keeps a soft
// endless gait and the curiosity spark glints above.
const MAIN_STROKES = [
  { d: "M31 66 L20 92 L15 116", delay: 0 }, // back leg
  { d: "M31 66 L40 93 L46 116", delay: 0.08 }, // front leg
  { d: "M31 66 L32 30", delay: 0.18 }, // spine
  { d: "M31 34 L19 51 L16 70", delay: 0.32 }, // back arm
  { d: "M31 34 L44 49 L41 69", delay: 0.4 }, // front arm
];

export default function StriderHero({ className = "" }) {
  const { t } = useLang();

  // Place a lineage figure on the horizon at horizontal fraction `xf`.
  const place = (xf, scale) => {
    const x = 70 + xf * 470;
    const y = 250 - 58 * scale;
    return `translate(${x} ${y}) scale(${scale})`;
  };

  return (
    <div className={className}>
      <svg
        viewBox="0 40 960 260"
        className="block w-full"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label={t.hero.evolutionCaption}
      >
        {/* soft ground glow so the scene sits in space */}
        <defs>
          <radialGradient id="strider-glow" cx="72%" cy="86%" r="42%">
            <stop offset="0%" stopColor="var(--spark)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--spark)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="960" height="300" fill="url(#strider-glow)" />

        {/* full horizon (faint) */}
        <line
          x1="40"
          y1="250"
          x2="920"
          y2="250"
          stroke="var(--ink)"
          strokeOpacity="0.14"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* travelled path — the ember trail up to the walker */}
        <line
          x1="40"
          y1="250"
          x2="726"
          y2="250"
          stroke="var(--spark)"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "drawStroke 1.2s cubic-bezier(.16,1,.3,1) .1s forwards",
            ["--dash"]: 1,
          }}
        />

        {/* lineage — the ancestors, quiet and fading in */}
        {LINEAGE.map((s, i) => {
          const xf = i / 4.8;
          return (
            <g
              key={i}
              transform={place(xf, 1.5)}
              opacity="0"
              style={{
                animation: `fadeIn .8s ease ${0.15 + i * 0.12}s forwards`,
              }}
            >
              <g
                className={`evo-pose ${s.anim}`}
                style={{ opacity: 0.12 + i * 0.03 }}
              >
                <LineageFigure limbs={s.limbs} head={s.head} />
              </g>
            </g>
          );
        })}

        {/* the modern human — drawn into being, then walking on */}
        <g transform="translate(690 62) scale(1.62)">
          <g
            className="hero-strider-walk"
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          >
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth={3.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {MAIN_STROKES.map((s, i) => (
                <path
                  key={i}
                  d={s.d}
                  pathLength="1"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1,
                    animation: `drawStroke .7s cubic-bezier(.16,1,.3,1) ${s.delay}s forwards`,
                    ["--dash"]: 1,
                  }}
                />
              ))}
              <circle
                cx="32"
                cy="21"
                r="9.4"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation:
                    "drawStroke .6s cubic-bezier(.16,1,.3,1) .5s forwards",
                  ["--dash"]: 1,
                }}
              />
            </g>

            {/* curiosity spark — ignites once the body exists */}
            <g
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: "sparkIgnite 1s cubic-bezier(.16,1,.3,1) .85s both",
              }}
            >
              <g className="sapien-spark">
                <path
                  d="M47 3 l1.7 4 4 1.7 -4 1.7 -1.7 4 -1.7 -4 -4 -1.7 4 -1.7 z"
                  fill="var(--spark)"
                  stroke="none"
                />
              </g>
              {/* embers drifting up from the spark */}
              <circle cx="47" cy="6" r="1.3" fill="var(--spark-2)"
                style={{ transformBox: "fill-box", transformOrigin: "center",
                  animation: "emberFloat 3.2s ease-in 1.6s infinite" }} />
              <circle cx="50" cy="6" r="1" fill="var(--spark)"
                style={{ transformBox: "fill-box", transformOrigin: "center",
                  animation: "emberFloat 3.6s ease-in 2.6s infinite" }} />
            </g>
          </g>
        </g>
      </svg>

      <style jsx>{`
        .hero-strider-walk {
          animation: heroWalk 1.9s ease-in-out 1.1s infinite;
        }
        @keyframes heroWalk {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(-1.4deg);
          }
          75% {
            transform: translateY(-2px) rotate(1.4deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-strider-walk {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
