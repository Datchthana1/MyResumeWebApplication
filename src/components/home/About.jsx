"use client";
import Image from "next/image";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/providers/LanguageProvider";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          blurb={t.about.blurb}
        />
      </Reveal>
      <div className="grid items-stretch gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* portrait, labelled like a specimen card, a wink at the theme.
            Height-capped on md+ so it doesn't dominate the row. */}
        <Reveal>
          <figure className="card card-hover h-full overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/5] w-full md:aspect-auto md:h-[460px]">
              <Image
                src={Dechthana}
                alt={`${t.hero.firstName} ${t.hero.lastName}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                Homo sapiens
              </span>
              <span className="mono text-[11px] text-ink-3">
                13.77°N · Bangkok
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="grid gap-5">
          <Reveal delay={80}>
            <div className="card card-hover h-full rounded-3xl p-7">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-ink-2 ${i > 0 ? "mt-3" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card card-hover rounded-3xl p-7">
              <h3 className="kicker mb-4">{t.about.languagesLabel}</h3>
              <ul className="space-y-3">
                {t.about.spoken.map((s) => (
                  <li key={s.lang} className="flex items-center justify-between">
                    <span className="text-ink">{s.lang}</span>
                    <span className="text-sm text-ink-3">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
