"use client";

/**
 * Sapien — the brand mark for this portfolio.
 *
 * A striding Homo sapiens silhouette: forward motion standing in for "the
 * never-stopping evolution of humankind" — i.e. relentless curiosity. One
 * parametric `Figure` drives everything: a `lean` angle tilts the upper body
 * about the hip so the same primitive reads as a hunched ancestor (big lean)
 * or an upright modern human (zero lean). `EvolutionMarch` lines several up
 * from hunched → upright as the hero's signature element.
 *
 * All strokes use `currentColor`, so color comes from the parent's text color.
 */

// One figure in a 40×56 local box. `lean` (deg) rotates the torso forward about
// the hip; `spark` adds the curiosity glint above the head (the modern human).
function Figure({ lean = 0, sw = 3.4, spark = false, className = "" }) {
  const hip = { x: 18, y: 34 };
  return (
    <g
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* legs stay planted on the ground line, mid-stride */}
      <path d={`M${hip.x} ${hip.y} L26 44 L30 53`} />
      <path d={`M${hip.x} ${hip.y} L11 45 L7 54`} />
      {/* upper body leans forward by `lean` degrees about the hip */}
      <g transform={`rotate(${lean} ${hip.x} ${hip.y})`}>
        <path d={`M${hip.x} ${hip.y} L20 15`} />
        <circle cx="21" cy="10.5" r="4.6" />
        <path d="M19.6 18 L28 23" />
        <path d="M19.6 18 L11 21" />
        {spark && (
          <g stroke="none" fill="var(--accent, #2f6bff)" className="sapien-spark">
            <path d="M27 1.5 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 z" />
          </g>
        )}
      </g>
    </g>
  );
}

/** Compact single-figure mark for the navbar / inline use. */
export function SapienMark({ size = 28, className = "", spark = true, sw = 3.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 56"
      role="img"
      aria-label="Sapien"
      className={className}
    >
      <Figure lean={0} spark={spark} sw={sw} />
    </svg>
  );
}

// One stick figure assembled from limb paths + a head, optionally with the
// curiosity spark. Stroke-only so it stays a "stick man".
function Stick({ head, limbs, spark, sw = 3 }) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {limbs.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <circle cx={head.cx} cy={head.cy} r={head.r} />
      {spark && (
        <g className="sapien-spark" stroke="none" fill="var(--accent, #2f6bff)">
          <path
            d={`M${spark.x} ${spark.y} l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 z`}
          />
        </g>
      )}
    </g>
  );
}

// The five evolutionary stages, each with its own posture + gait animation.
// Local coords share a ground line at y=58, figures face right.
const STAGES = [
  {
    key: "ape", // ลิง — crouched, long arms reaching the ground
    anim: "evo-ape",
    sw: 2.8,
    head: { cx: 28, cy: 31, r: 4 },
    limbs: [
      "M16 42 L25 34", // low diagonal spine
      "M25 35 L30 48 L32 57", // front arm to ground
      "M24 36 L20 48 L19 57", // back arm to ground
      "M16 42 L13 51 L11 58", // back leg (bent)
      "M16 42 L20 51 L23 58", // front leg (bent)
    ],
  },
  {
    key: "knuckle", // วานรไร้หาง — tailless ape, knuckle-walking
    anim: "evo-knuckle",
    sw: 2.9,
    head: { cx: 25.5, cy: 22, r: 4 },
    limbs: [
      "M16 40 L23 26", // steep spine
      "M23 27 L28 42 L30 54", // long knuckle arm
      "M22 28 L16 37", // back arm
      "M16 40 L12 50 L10 58",
      "M16 40 L21 50 L24 58",
    ],
  },
  {
    key: "first", // มนุษย์คนแรก — first hominid, semi-upright
    anim: "evo-first",
    sw: 3,
    head: { cx: 22.5, cy: 15.5, r: 4.2 },
    limbs: [
      "M17 38 L21 20",
      "M21 21 L27 30",
      "M21 21 L14 28",
      "M17 38 L12 49 L9 58",
      "M17 38 L23 48 L26 58",
    ],
  },
  {
    key: "erectus", // Homo erectus — upright, striding
    anim: "evo-erectus",
    sw: 3.1,
    head: { cx: 20.5, cy: 12, r: 4.4 },
    limbs: [
      "M17 37 L19.5 17",
      "M19 18 L26 24",
      "M19 18 L11 22",
      "M17 37 L11 48 L7 57",
      "M17 37 L24 47 L28 57",
    ],
  },
  {
    key: "sapiens", // Homo sapiens — fully upright + curiosity spark
    anim: "evo-sapiens",
    sw: 3.2,
    spark: { x: 25, y: 2 },
    head: { cx: 19, cy: 11, r: 4.5 },
    limbs: [
      "M17 37 L18.5 16",
      "M18 17 L26 22",
      "M18 17 L10 21",
      "M17 37 L10 48 L6 57",
      "M17 37 L24 47 L28 57",
    ],
  },
];

/**
 * The hero signature: the march of human evolution — ape → tailless ape →
 * first human → Homo erectus → Homo sapiens. Each rises into place in sequence
 * on load, then keeps its own characteristic gait forever (evolution that
 * never stops). Stage labels live in the aria-label for accessibility.
 */
export function EvolutionMarch({ className = "" }) {
  const step = 40; // horizontal spacing between stages
  const width = step * STAGES.length + 8;

  return (
    <svg
      viewBox={`0 0 ${width} 62`}
      className={className}
      role="img"
      aria-label="The march of human evolution: ape, tailless ape, first human, Homo erectus, Homo sapiens — curiosity that never stops evolving"
    >
      {/* ground line the march walks along */}
      <line
        x1="4"
        y1="58"
        x2={width - 4}
        y2="58"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {STAGES.map((s, i) => (
        // Outer <g> positions the figure (transform attribute only). The CSS
        // entrance/gait animations live on inner <g>s so their animated
        // `transform` never clobbers this horizontal placement.
        <g key={s.key} transform={`translate(${4 + i * step} 0)`}>
          <g className="sapien-figure" style={{ animationDelay: `${i * 160}ms` }}>
            <g className={`evo-pose ${s.anim}`}>
              <Stick head={s.head} limbs={s.limbs} spark={s.spark} sw={s.sw} />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export default SapienMark;
