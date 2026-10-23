"use client";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/providers/LanguageProvider";

export default function Skills() {
  const { t } = useLang();

  return (
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
  );
}
