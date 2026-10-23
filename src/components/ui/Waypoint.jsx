/* A hairline "horizon" between sections — the continuous ground the whole page
   walks along, with a single ember node where the reader currently stands. */
export default function Waypoint({ className = "max-w-5xl px-6" }) {
  return (
    <div aria-hidden className={`mx-auto flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-line" />
      <span className="h-1.5 w-1.5 rounded-full bg-spark/70" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
