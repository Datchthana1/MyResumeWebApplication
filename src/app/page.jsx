"use client";
import Image from "next/image";
import Link from "next/link";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/ui/Reveal";
import Typewriter from "@/components/ui/Typewriter";
import Magnetic from "@/components/ui/Magnetic";
import { MonitorSummary } from "@/components/monitor/Monitor";
import { SapienMark } from "@/components/ui/SapienMark";
import StriderHero from "@/components/sections/StriderHero";
import EvolutionScroll from "@/components/sections/EvolutionScroll";
import { useLang } from "@/providers/LanguageProvider";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

/* A section header that tells a first-time visitor exactly what they're looking
   at: a mono eyebrow with the ember waypoint, a display title with a rule that
   draws in, and a plain-language one-liner. */
function SectionHeading({ eyebrow, title, blurb }) {
  return (
    <div className="mb-9">
      {eyebrow && (
        <p className="kicker mb-3 flex items-center gap-2">
          <span className="spark-dot" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
        <span className="title-rule" />
      </h2>
      {blurb && (
        <p className="mt-3 max-w-2xl text-ink-2 leading-relaxed">{blurb}</p>
      )}
    </div>
  );
}

/* A hairline "horizon" between sections — the continuous ground the whole page
   walks along, with a single ember node where the reader currently stands. */
function Waypoint() {
  return (
    <div aria-hidden className="mx-auto flex max-w-5xl items-center gap-3 px-6">
      <span className="h-px flex-1 bg-line" />
      <span className="h-1.5 w-1.5 rounded-full bg-spark/70" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLang();

  return (
    <div className="relative font-sans">
      {/* ============================ HERO ============================ */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col overflow-hidden pt-24"
      >
        {/* ambient warmth — a slow ember bloom low on the horizon */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-aurora absolute left-1/2 top-[38%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--spark-soft),transparent_62%)]" />
        </div>

        {/* headline block */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="animate-fadeInUp kicker mb-5 inline-flex items-center gap-2"
              style={{ animationDelay: "0ms" }}
            >
              <span className="spark-dot" />
              {t.hero.kicker}
            </p>

            <p
              className="animate-fadeInUp mb-4 text-ink-3"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.greeting}
            </p>

            <h1
              className="animate-fadeInUp font-display font-extrabold leading-[0.92] tracking-tight text-ink text-[clamp(2.6rem,12vw,7rem)]"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.firstName}
              <br />
              <span className="text-gradient-animated">{t.hero.lastName}</span>
            </h1>

            <div
              className="animate-fadeInUp mt-7 flex min-h-[2.25rem] items-center justify-center text-lg font-medium sm:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              <span className="mono text-ink-3 mr-2">&gt;</span>
              <Typewriter words={t.hero.positions} className="text-ink-2" />
            </div>

            <p
              className="animate-fadeInUp mx-auto mt-6 max-w-xl leading-relaxed text-ink-2"
              style={{ animationDelay: "320ms" }}
            >
              {t.hero.tagline}
            </p>

            <div
              className="animate-fadeInUp mt-9 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "440ms" }}
            >
              <Magnetic>
                <Link href="#experience" className="btn btn-spark">
                  {t.ui.viewWork}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="#contact" className="btn btn-ghost">
                  {t.ui.getInTouch}
                </Link>
              </Magnetic>
            </div>

            <div
              className="animate-fadeInUp mt-7 flex items-center justify-center gap-5 text-sm"
              style={{ animationDelay: "520ms" }}
            >
              {t.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-3 transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* the signature: ancestors trail in, a spark ignites, a human is drawn
            and walks on — the whole thesis of the page in one scene */}
        <div className="relative w-full">
          <StriderHero className="mx-auto max-w-6xl px-6" />
          <p className="mt-1 text-center kicker">{t.hero.evolutionCaption}</p>
          <div
            className="pointer-events-none mt-4 flex justify-center pb-6"
            aria-hidden
          >
            <span className="animate-floaty kicker text-ink-3">
              ↓ {t.hero.scrollHint}
            </span>
          </div>
        </div>
      </section>

      {/* ============================ THE ASCENT ============================ */}
      {/* Scroll-scrubbed walk through human evolution — the deep dive. */}
      <EvolutionScroll />

      {/* ============================ CREDO ============================ */}
      <section id="credo" className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mb-9 flex items-center gap-3">
            <SapienMark size={26} className="text-ink" />
            <p className="kicker">{t.credo.eyebrow}</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className="font-display text-2xl font-semibold leading-[1.3] tracking-tight text-ink sm:text-[2.05rem]">
            {t.credo.lead}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl leading-relaxed text-ink-2">
            {t.credo.body}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 border-l-2 border-spark pl-5 font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
            {t.credo.close}
          </p>
        </Reveal>
      </section>

      <Waypoint />

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            blurb={t.about.blurb}
          />
        </Reveal>
        <div className="grid items-stretch gap-5 md:grid-cols-5">
          {/* portrait — labelled like a specimen card, a wink at the theme */}
          <Reveal className="md:col-span-2">
            <figure className="card card-hover h-full overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={Dechthana}
                  alt={`${t.hero.firstName} ${t.hero.lastName}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
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

          <div className="grid gap-5 md:col-span-3">
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
                    <li
                      key={s.lang}
                      className="flex items-center justify-between"
                    >
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

      <Waypoint />

      {/* ============================ SKILLS ============================ */}
      <section id="skills" className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            blurb={t.skills.blurb}
          />
        </Reveal>
        <Reveal>
          <div className="card divide-line rounded-3xl p-7 sm:p-8 divide-y">
            {t.skills.groups.map((group) => (
              <div
                key={group.title}
                className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[140px_1fr] sm:gap-6"
              >
                <h3 className="kicker sm:pt-1.5">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Waypoint />

      {/* ========================= EXPERIENCE ========================= */}
      <section id="experience" className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            blurb={t.experience.blurb}
          />
        </Reveal>

        {/* the career as a walk along the same horizon */}
        <ol className="relative ml-2 space-y-7 border-l border-line">
          {t.experience.items.map((exp, i) => (
            <Reveal
              as="li"
              key={`${exp.role}-${i}`}
              delay={i * 70}
              className="relative pl-7"
            >
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-spark ring-4 ring-paper" />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-semibold text-ink sm:text-lg">
                  {exp.role}
                </h3>
                <span className="mono shrink-0 text-xs text-ink-3">
                  {exp.period}
                </span>
              </div>
              <p className="mb-2.5 text-sm text-ink-2">{exp.org}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80}>
          <div className="mt-8">
            <Link
              href="/Experience"
              className="group inline-flex items-center gap-2 font-medium text-ink transition-all hover:gap-3 hover:text-spark-ink"
            >
              {t.ui.seeDetailedExperience}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <Waypoint />

      {/* ============================ MONITOR ============================ */}
      <section id="monitor" className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow={t.monitor.eyebrow}
            title={t.monitor.title}
            blurb={t.monitor.subtitle}
          />
        </Reveal>
        <Reveal delay={100}>
          <MonitorSummary />
        </Reveal>
      </section>

      <Waypoint />

      {/* ============================ EDUCATION ============================ */}
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
                  <h3 className="text-lg font-semibold text-ink">
                    {edu.degree}
                  </h3>
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

      <Waypoint />

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            blurb={t.contact.blurb}
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="card card-hover rounded-3xl p-7 sm:p-8">
            <p className="mb-6 leading-relaxed text-ink-2">{t.contact.intro}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="kicker mb-1">{t.contact.emailFormalLabel}</p>
                <a
                  href="mailto:Dechthana.ar@mail.wu.ac.th"
                  className="link-underline break-all text-ink transition-colors hover:text-spark-ink"
                >
                  Dechthana.ar@mail.wu.ac.th
                </a>
              </div>
              <div>
                <p className="kicker mb-1">{t.contact.emailPersonalLabel}</p>
                <a
                  href="mailto:Kaiza941@gmail.com"
                  className="link-underline break-all text-ink transition-colors hover:text-spark-ink"
                >
                  Kaiza941@gmail.com
                </a>
              </div>
              <div>
                <p className="kicker mb-1">{t.contact.locationLabel}</p>
                <p className="text-ink">{t.contact.location}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    t.contact.coordinates
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 transition-colors hover:border-line-strong"
                >
                  <span className="spark-dot" />
                  <span className="mono text-xs tracking-wide text-ink-2 group-hover:text-ink">
                    {t.contact.coordinates}
                  </span>
                </a>
              </div>
              <div>
                <p className="kicker mb-1">{t.contact.findMeLabel}</p>
                <div className="flex gap-4">
                  {t.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink transition-colors hover:text-spark-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="h-8" />
    </div>
  );
}
