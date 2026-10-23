/* A section header that tells a first-time visitor exactly what they're looking
   at: a mono eyebrow with the ember waypoint, a display title with a rule that
   draws in (inside a <Reveal>), and a plain-language one-liner.
   `as` lets page headers render an <h1> with the same treatment. */
export default function SectionHeading({
  eyebrow,
  title,
  blurb,
  as: Tag = "h2",
  className = "mb-9",
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="kicker mb-3 flex items-center gap-2">
          <span className="spark-dot" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
        <span className="title-rule" aria-hidden />
      </Tag>
      {blurb && (
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{blurb}</p>
      )}
    </div>
  );
}
