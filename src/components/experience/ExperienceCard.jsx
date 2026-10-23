"use client";
import Pill from "@/components/ui/Pill";
import Gallery from "@/components/experience/Gallery";

// One role. Wide screens split it into a sticky meta column (title, org,
// tools, links) and a reading column (description, then photos). Phones stack.
export default function ExperienceCard({
  title,
  org,
  paragraphs = [],
  tools,
  links,
  pictures,
  labels,
}) {
  return (
    <article className="card p-6 sm:p-8 md:p-10">
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="flex flex-col gap-6 md:sticky md:top-28 md:w-56 md:shrink-0 md:self-start">
          <header>
            <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-ink">
              {title}
            </h2>
            {org && (
              <p className="mt-2 text-sm leading-relaxed text-ink-3">{org}</p>
            )}
          </header>

          {tools?.length > 0 && (
            <div>
              <h3 className="kicker mb-3">{labels.toolsLabel}</h3>
              <ul className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Pill key={tool} as="li">
                    {tool}
                  </Pill>
                ))}
              </ul>
            </div>
          )}

          {links && (
            <div>
              <h3 className="kicker mb-3">{labels.linksLabel}</h3>
              <ul className="flex flex-col gap-2">
                {Object.entries(links).map(([label, url]) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm text-ink hover:text-spark-ink"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-8">
          {paragraphs.length > 0 && (
            <div>
              <h3 className="kicker mb-3">{labels.descriptionLabel}</h3>
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-2">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          <Gallery pictures={pictures} title={title} />
        </div>
      </div>
    </article>
  );
}
