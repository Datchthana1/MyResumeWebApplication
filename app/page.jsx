"use client";
import Image from "next/image";
import Link from "next/link";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

function Pill({ children }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm card-thin text-neutral-700 hover:text-neutral-950 hover:border-black/20 transition-colors">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 mb-3">
        {eyebrow}
      </p>
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
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
          <div className="relative inline-block mb-10">
            <Image
              src={Dechthana}
              alt={`${t.hero.firstName} ${t.hero.lastName}`}
              width={144}
              height={144}
              priority
              className="relative rounded-full ring-1 ring-black/10 shadow-lg object-cover w-[144px] h-[144px]"
            />
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 mb-5">
            {t.hero.greeting}
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-neutral-950">
            {t.hero.firstName}{" "}
            <span className="text-gradient-animated">{t.hero.lastName}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-2xl font-medium text-neutral-500">
            {t.hero.positions.join("  ·  ")}
          </p>

          <p className="mt-5 max-w-xl mx-auto text-neutral-500 leading-relaxed">
            {t.hero.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#experience"
              className="px-6 py-3 rounded-full font-medium text-white bg-neutral-950 hover:bg-black hover:scale-105 transition-all duration-300"
            >
              {t.ui.viewWork}
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full font-medium text-neutral-800 border border-black/15 hover:border-black/40 hover:text-black transition-all duration-300"
            >
              {t.ui.getInTouch}
            </Link>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5 text-sm">
            {t.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-950 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-300 animate-bounceDown">
          <span className="text-2xl">&#8595;</span>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        </Reveal>
        <div className="grid md:grid-cols-5 gap-6 items-start">
          <Reveal className="md:col-span-3">
            <div className="card card-hover rounded-3xl p-8 h-full">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-neutral-600 leading-relaxed ${i > 0 ? "mt-4" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="card card-hover rounded-3xl p-8 h-full">
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
      <section id="skills" className="relative max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {t.skills.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 100}>
              <div className="card card-hover rounded-3xl p-7 h-full">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-5">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================= EXPERIENCE ========================= */}
      <section id="experience" className="relative max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
          />
        </Reveal>

        <div className="space-y-6">
          {t.experience.items.map((exp, i) => (
            <Reveal key={`${exp.role}-${i}`} delay={i * 80}>
              <article className="card card-hover rounded-3xl p-7 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-xl font-semibold text-neutral-950">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-mono text-neutral-500">
                    {exp.period}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">{exp.org}</p>
                <p className="text-neutral-600 leading-relaxed">{exp.summary}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 text-center">
            <Link
              href="/Experience"
              className="inline-flex items-center gap-2 text-neutral-950 hover:text-black transition-colors"
            >
              {t.ui.seeDetailedExperience}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================ EDUCATION ============================ */}
      <section id="education" className="relative max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow={t.education.eyebrow}
            title={t.education.title}
          />
        </Reveal>
        <div className="space-y-6">
          {t.education.items.map((edu, i) => (
            <Reveal key={`${edu.degree}-${i}`} delay={i * 80}>
              <article className="card card-hover rounded-3xl p-7 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="text-xl font-semibold text-neutral-950">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-mono text-neutral-500">
                    {edu.period}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">{edu.school}</p>
                <p className="text-neutral-600 leading-relaxed">{edu.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="relative max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
        </Reveal>
        <Reveal delay={100}>
          <div className="card card-hover rounded-3xl p-8 sm:p-10">
            <p className="text-neutral-600 leading-relaxed mb-8">
              {t.contact.intro}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
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
