"use client";
import Image from "next/image";
import Link from "next/link";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/Reveal";
import SignalField from "@/components/SignalField";
import Typewriter from "@/components/Typewriter";
import Magnetic from "@/components/Magnetic";
import { MonitorSummary } from "@/components/Monitor";
import { EvolutionMarch } from "@/components/SapienMark";
import EvolutionScroll from "@/components/EvolutionScroll";
import { useLang } from "@/components/LanguageProvider";

function Pill({ children }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm card-thin text-neutral-700 hover:text-neutral-950 hover:border-black/20 transition-colors">
      {children}
    </span>
  );
}

function SectionHeading({ title }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
        {title}
      </h2>
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20"
      >
        {/* Ambient: a living signal field (sensor stream) behind the name,
            tying the page to the air-quality / data work. */}
        <SignalField className="pointer-events-none absolute inset-0 -z-10 opacity-90" />
        {/* Paper wash — keeps the text legible and fades the field at the edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(46% 34% at 50% 47%, rgba(255,255,255,0.72), rgba(255,255,255,0) 70%), linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0) 22%, rgba(255,255,255,0) 78%, #ffffff)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-aurora absolute -top-24 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-soft),transparent_62%)]" />
          {/* faint baseline grid the march walks on */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="animate-fadeInUp mb-9" style={{ animationDelay: "0ms" }}>
            <div className="group relative inline-block animate-floaty">
              <span
                aria-hidden
                className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,var(--accent),transparent_55%)] opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-40"
              />
              <Image
                src={Dechthana}
                alt={`${t.hero.firstName} ${t.hero.lastName}`}
                width={144}
                height={144}
                priority
                className="relative rounded-full ring-1 ring-black/10 shadow-lg object-cover w-[144px] h-[144px]"
              />
            </div>
          </div>

          <p
            className="animate-fadeInUp font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 mb-5"
            style={{ animationDelay: "80ms" }}
          >
            {t.hero.greeting}
          </p>
          <h1
            className="animate-fadeInUp font-display text-6xl sm:text-8xl font-bold tracking-tight leading-[0.95] text-neutral-950"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero.firstName}
            <br />
            <span className="text-gradient-animated">{t.hero.lastName}</span>
          </h1>

          {/* Roles type and erase like a live readout */}
          <div
            className="animate-fadeInUp mt-7 flex min-h-[2.25rem] items-center justify-center text-lg font-medium text-neutral-500 sm:text-2xl"
            style={{ animationDelay: "240ms" }}
          >
            <Typewriter words={t.hero.positions} className="text-neutral-600" />
          </div>

          <p
            className="animate-fadeInUp mt-5 max-w-xl mx-auto text-neutral-500 leading-relaxed"
            style={{ animationDelay: "320ms" }}
          >
            {t.hero.tagline}
          </p>

          {/* Signature: Homo sapiens evolving forward, forever walking. */}
          <div
            className="animate-fadeInUp mt-9 flex flex-col items-center"
            style={{ animationDelay: "400ms" }}
          >
            <EvolutionMarch className="h-14 w-auto text-neutral-900 sm:h-16" />
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              {t.hero.evolutionCaption}
            </p>
          </div>

          <div
            className="animate-fadeInUp mt-9 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "480ms" }}
          >
            <Magnetic>
              <Link
                href="#experience"
                className="inline-block px-6 py-3 rounded-full font-medium text-white bg-neutral-950 hover:bg-black transition-all duration-300"
              >
                {t.ui.viewWork}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="#contact"
                className="inline-block px-6 py-3 rounded-full font-medium text-neutral-800 border border-black/15 hover:border-black/40 hover:text-black transition-all duration-300"
              >
                {t.ui.getInTouch}
              </Link>
            </Magnetic>
          </div>

          <div
            className="animate-fadeInUp mt-7 flex items-center justify-center gap-5 text-sm"
            style={{ animationDelay: "560ms" }}
          >
            {t.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-neutral-400 hover:text-neutral-950 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ THE ASCENT ============================ */}
      {/* Scroll-scrubbed walk through human evolution — the signature moment. */}
      <EvolutionScroll />

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <SectionHeading title={t.about.title} />
        </Reveal>
        <div className="grid md:grid-cols-5 gap-5 items-stretch">
          <Reveal className="md:col-span-3">
            <div className="card card-hover rounded-3xl p-7 h-full">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-neutral-600 leading-relaxed ${i > 0 ? "mt-3" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="card card-hover rounded-3xl p-7 h-full">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                {t.about.languagesLabel}
              </h3>
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
      <section id="skills" className="relative max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <SectionHeading title={t.skills.title} />
        </Reveal>
        <Reveal>
          <div className="card rounded-3xl p-7 sm:p-8 divide-y divide-black/5">
            {t.skills.groups.map((group) => (
              <div
                key={group.title}
                className="grid sm:grid-cols-[120px_1fr] gap-3 sm:gap-6 py-4 first:pt-0 last:pb-0"
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 sm:pt-1.5">
                  {group.title}
                </h3>
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
      <section id="experience" className="relative max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <SectionHeading title={t.experience.title} />
        </Reveal>

        {/* Compact timeline — full write-ups live on /Experience */}
        <ol className="relative border-l border-black/10 ml-2 space-y-7">
          {t.experience.items.map((exp, i) => (
            <Reveal as="li" key={`${exp.role}-${i}`} delay={i * 70} className="relative pl-7">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-950 ring-4 ring-white" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-950">
                  {exp.role}
                </h3>
                <span className="text-xs font-mono text-neutral-400 shrink-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-neutral-500 mb-2.5">{exp.org}</p>
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
              className="inline-flex items-center gap-2 text-neutral-950 hover:text-black hover:gap-3 transition-all"
            >
              {t.ui.seeDetailedExperience}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================ MONITOR ============================ */}
      <section id="monitor" className="relative max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <SectionHeading title={t.monitor.title} />
        </Reveal>
        <Reveal>
          <p className="-mt-4 mb-8 max-w-2xl text-neutral-500 leading-relaxed">
            {t.monitor.subtitle}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <MonitorSummary />
        </Reveal>
      </section>

      {/* ============================ EDUCATION ============================ */}
      <section id="education" className="relative max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <SectionHeading title={t.education.title} />
        </Reveal>
        <div className="space-y-5">
          {t.education.items.map((edu, i) => (
            <Reveal key={`${edu.degree}-${i}`} delay={i * 80}>
              <article className="card card-hover rounded-3xl p-7">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-mono text-neutral-500">
                    {edu.period}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mb-3">{edu.school}</p>
                <p className="text-neutral-600 leading-relaxed">{edu.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="relative max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <SectionHeading title={t.contact.title} />
        </Reveal>
        <Reveal delay={100}>
          <div className="card card-hover rounded-3xl p-7 sm:p-8">
            <p className="text-neutral-600 leading-relaxed mb-6">
              {t.contact.intro}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {t.contact.emailFormalLabel}
                </p>
                <a
                  href="mailto:Dechthana.ar@mail.wu.ac.th"
                  className="text-neutral-800 hover:text-black break-all transition-colors"
                >
                  Dechthana.ar@mail.wu.ac.th
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {t.contact.emailPersonalLabel}
                </p>
                <a
                  href="mailto:Kaiza941@gmail.com"
                  className="text-neutral-800 hover:text-black break-all transition-colors"
                >
                  Kaiza941@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {t.contact.locationLabel}
                </p>
                <p className="text-neutral-800">{t.contact.location}</p>
                {/* Coordinate badge — central Bang Kapi, with a corner accent */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    t.contact.coordinates
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-lg border border-black/10 bg-white px-3 py-1.5 transition-colors hover:border-black/25"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span className="font-mono text-xs tracking-wide text-neutral-500 group-hover:text-neutral-800">
                    {t.contact.coordinates}
                  </span>
                  {/* accent corner triangle */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 right-0 h-0 w-0 border-b-[14px] border-l-[14px] border-l-transparent transition-transform duration-300 group-hover:scale-125"
                    style={{ borderBottomColor: "var(--accent)" }}
                  />
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {t.contact.findMeLabel}
                </p>
                <div className="flex gap-4">
                  {t.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-800 hover:text-black underline-offset-4 hover:underline transition-colors"
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
