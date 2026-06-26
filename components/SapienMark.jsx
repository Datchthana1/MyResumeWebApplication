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

/**
 * The hero signature: a row of figures evolving from hunched to upright. On
 * load each rises into place in sequence (evolution unfolding); the upright
 * human keeps a subtle, endless stride (evolution that never stops).
 */
export function EvolutionMarch({ className = "" }) {
  // hunched ancestor → … → upright modern human (with the curiosity spark)
  const stages = [
    { lean: 40, sw: 3.2 },
    { lean: 27, sw: 3.3 },
    { lean: 14, sw: 3.4 },
    { lean: 0, sw: 3.6, spark: true },
  ];
  const step = 44; // horizontal spacing between figures
  const width = step * stages.length + 12;

  return (
    <svg
      viewBox={`0 0 ${width} 64`}
      className={className}
      role="img"
      aria-label="The evolution of Homo sapiens — curiosity that never stops"
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
      {stages.map((s, i) => (
        <g
          key={i}
          className="sapien-figure"
          style={{ animationDelay: `${i * 180}ms` }}
          transform={`translate(${8 + i * step} 4)`}
        >
          {/* the last (upright) figure keeps walking forever */}
          <g className={i === stages.length - 1 ? "sapien-walk" : ""}>
            <Figure lean={s.lean} sw={s.sw} spark={s.spark} />
          </g>
        </g>
      ))}
    </svg>
  );
}

export default SapienMark;
