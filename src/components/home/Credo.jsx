"use client";
import Reveal from "@/components/ui/Reveal";
import { SapienMark } from "@/components/ui/SapienMark";
import { useLang } from "@/providers/LanguageProvider";

export default function Credo() {
  const { t } = useLang();

  return (
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
  );
}
