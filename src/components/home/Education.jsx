"use client";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/providers/LanguageProvider";

export default function Education() {
  const { t } = useLang();

  return (
    <section id="education" className="relative mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <SectionHeading
          eyebrow={t.education.eyebrow}
          title={t.education.title}
          blurb={t.education.blurb}
        />
      </Reveal>
      <div className="space-y-5">
        {t.education.items.map((edu, i) => (
          <Reveal key={`${edu.degree}-${i}`} delay={i * 80}>
            <article className="card card-hover rounded-3xl p-7">
              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold text-ink">{edu.degree}</h3>
                <span className="mono text-sm text-ink-3">{edu.period}</span>
              </div>
              <p className="mb-3 text-sm text-ink-2">{edu.school}</p>
              {edu.honour && (
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-spark-soft px-3 py-1 text-sm font-medium text-spark-ink">
                  <span aria-hidden>★</span>
                  {edu.honour}
                </p>
              )}
              <p className="leading-relaxed text-ink-2">{edu.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
