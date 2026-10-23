"use client";
import Link from "next/link";
import Typewriter from "@/components/ui/Typewriter";
import Magnetic from "@/components/ui/Magnetic";
import StriderHero from "@/components/home/StriderHero";
import { useLang } from "@/providers/LanguageProvider";

export default function Hero() {
  const { t } = useLang();

  return (
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
  );
}
