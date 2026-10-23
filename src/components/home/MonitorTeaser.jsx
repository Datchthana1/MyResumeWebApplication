"use client";
import { MonitorSummary } from "@/components/monitor/Monitor";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/providers/LanguageProvider";

export default function MonitorTeaser() {
  const { t } = useLang();

  return (
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
  );
}
