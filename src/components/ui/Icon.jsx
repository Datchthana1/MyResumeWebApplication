/* A tiny inline icon set — hand-drawn strokes that match the Sapien line art,
   so the site doesn't pull in an icon library for five glyphs. */
const PATHS = {
  // a four-point spark (AI / curiosity)
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M12 8l1.4 2.6L16 12l-2.6 1.4L12 16l-1.4-2.6L8 12l2.6-1.4z",
  // a heartbeat trace (live monitor)
  pulse: "M3 12h4l2-5 4 10 2-5h6",
  // an open field notebook (experience)
  book: "M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5zM12 6v13.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7",
  close: "M6 6l12 12M18 6L6 18",
  send: "M4 12l16-8-6 16-2.5-6.5z",
};

export default function Icon({ name, size = 18, className = "", strokeWidth = 1.7 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
