"use client";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/providers/LanguageProvider";

export default function ExperienceTimeline() {
  const { t } = useLang();

  return (
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
          <Link href="/Experience" className="btn btn-ghost">
            {t.ui.seeDetailedExperience}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
