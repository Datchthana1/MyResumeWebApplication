"use client";
import Image from "next/image";
import Link from "next/link";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/Reveal";
import SignalField from "@/components/SignalField";
import Magnetic from "@/components/Magnetic";
import Typewriter from "@/components/Typewriter";
import { MonitorSummary } from "@/components/Monitor";
import { useLang } from "@/components/LanguageProvider";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="kicker mb-3 flex items-center gap-2">
          <span className="signal-dot" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
        {title}
      </h2>
      <span className="title-rule" />
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
        className="relative isolate min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24"
      >
        {/* Signature: a living signal field behind the name */}
        <SignalField className="absolute inset-0 z-0" />
        {/* Paper wash — clears a legible space behind the text, fades the
            field into the page top and bottom */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(46% 34% at 50% 47%, rgba(244,245,243,0.66), rgba(244,245,243,0) 70%), linear-gradient(to bottom, rgba(244,245,243,0.55), rgba(244,245,243,0) 22%, rgba(244,245,243,0) 76%, var(--paper))",
          }}
        />

        {/* Telemetry strip */}
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-center px-6">
          <div className="kicker flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span>13.7563&deg;N 100.5018&deg;E</span>
            <span className="hidden sm:inline">DATA &middot; AI ENGINEER</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="signal-dot" /> LIVE
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center animate-fadeInUp">
          <div className="relative mb-10 inline-block">
            <Image
              src={Dechthana}
              alt={`${t.hero.firstName} ${t.hero.lastName}`}
              width={144}
              height={144}
              priority
              className="relative h-[144px] w-[144px] rounded-full object-cover shadow-lg ring-1 ring-black/10"
            />
            {/* Status indicator — the instrument is "online" */}
            <span className="absolute bottom-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
              <span className="signal-dot" />
            </span>
          </div>

          <p className="kicker mb-5">{t.hero.greeting}</p>
          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-neutral-950 sm:text-8xl">
            {t.hero.firstName}
            <br />
            <span className="text-gradient-animated">{t.hero.lastName}</span>
          </h1>

          <div className="mt-7 flex min-h-[2.25rem] items-center justify-center text-lg font-medium text-neutral-500 sm:text-2xl">
            <Typewriter words={t.hero.positions} className="text-neutral-700" />
          </div>

          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-neutral-500">
            {t.hero.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link href="#experience" className="btn-primary">
                {t.ui.viewWork}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="#contact" className="btn-ghost">
                {t.ui.getInTouch}
              </Link>
            </Magnetic>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5 text-sm">
            {t.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-neutral-400 transition-colors hover:text-neutral-950"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll cue — only shown when the viewport is tall enough to clear
            the hero content, so it never collides with the social links */}
        <div className="scroll-cue kicker pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 [@media(min-height:960px)]:flex">
          <span>SCROLL</span>
          <span aria-hidden>&darr;</span>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        </Reveal>
        <div className="grid items-stretch gap-5 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="card card-hover h-full rounded-3xl p-7">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-neutral-600 ${i > 0 ? "mt-3" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="card card-hover h-full rounded-3xl p-7">
              <h3 className="kicker mb-4">{t.about.languagesLabel}</h3>
              <ul className="space-y-3">
                {t.about.spoken.map((s) => (
                  <li key={s.lang} className="flex items-center justify-between">
                    <span className="text-neutral-800">{s.lang}</span>
                    <span className="text-sm text-neutral-500">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ SKILLS ============================ */}
      <section id="skills" className="relative mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
        </Reveal>
        <Reveal>
          <div className="card divide-y divide-black/5 rounded-3xl p-7 sm:p-8">
            {t.skills.groups.map((group) => (
              <div
                key={group.title}
                className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[120px_1fr] sm:gap-6"
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

      {/* ========================= EXPERIENCE ========================= */}
      <section id="experience" className="relative mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <SectionHeading
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
          />
        </Reveal>

        {/* Compact timeline — full write-ups live on /Experience */}
        <ol className="relative ml-2 space-y-7 border-l border-black/10">
          {t.experience.items.map((exp, i) => (
            <Reveal
              as="li"
              key={`${exp.role}-${i}`}
              delay={i * 70}
              className="relative pl-7"
            >
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-(--paper)" />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
                  {exp.role}
                </h3>
                <span className="shrink-0 font-mono text-xs text-neutral-400">
                  {exp.period}
                </span>
              </div>
              <p className="mb-2.5 text-sm text-neutral-500">{exp.org}</p>
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
              className="group inline-flex items-center gap-2 font-medium text-neutral-950 transition-all hover:gap-3 hover:text-(--signal-strong)"
            >
              {t.ui.seeDetailedExperience}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================ MONITOR ============================ */}
      <section id="monitor" className="relative mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <SectionHeading eyebrow={t.monitor.eyebrow} title={t.monitor.title} />
        </Reveal>
        <Reveal>
          <p className="-mt-4 mb-8 max-w-2xl leading-relaxed text-neutral-500">
            {t.monitor.subtitle}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <MonitorSummary />
        </Reveal>
      </section>

      {/* ============================ EDUCATION ============================ */}
      <section id="education" className="relative mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <SectionHeading
            eyebrow={t.education.eyebrow}
            title={t.education.title}
          />
        </Reveal>
        <div className="space-y-5">
          {t.education.items.map((edu, i) => (
            <Reveal key={`${edu.degree}-${i}`} delay={i * 80}>
              <article className="card card-hover rounded-3xl p-7">
                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-sm text-neutral-500">
                    {edu.period}
                  </span>
                </div>
                <p className="mb-3 text-sm text-neutral-500">{edu.school}</p>
                <p className="leading-relaxed text-neutral-600">{edu.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="relative mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
        </Reveal>
        <Reveal delay={100}>
          <div className="card card-hover rounded-3xl p-7 sm:p-8">
            <p className="mb-6 leading-relaxed text-neutral-600">
              {t.contact.intro}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="kicker mb-1">{t.contact.emailFormalLabel}</p>
                <a
                  href="mailto:Dechthana.ar@mail.wu.ac.th"
                  className="link-underline break-all text-neutral-800 hover:text-black"
                >
                  Dechthana.ar@mail.wu.ac.th
                </a>
              </div>
              <div>
                <p className="kicker mb-1">{t.contact.emailPersonalLabel}</p>
                <a
                  href="mailto:Kaiza941@gmail.com"
                  className="link-underline break-all text-neutral-800 hover:text-black"
                >
                  Kaiza941@gmail.com
                </a>
              </div>
              <div>
                <p className="kicker mb-1">{t.contact.locationLabel}</p>
                <p className="text-neutral-800">{t.contact.location}</p>
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
                      className="link-underline text-neutral-800 hover:text-black"
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
