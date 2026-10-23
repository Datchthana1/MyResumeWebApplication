"use client";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FEATURES } from "@/config/site";
import { useLang } from "@/providers/LanguageProvider";

/* The standalone features (chat, live monitor, full experience) as whole-card
   links: the parts of this site that are working systems, not just a resume. */
export default function Explore() {
  const { t } = useLang();

  return (
    <section id="explore" className="relative mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <SectionHeading
          eyebrow={t.explore.eyebrow}
          title={t.explore.title}
          blurb={t.explore.blurb}
        />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((f, i) => {
          const item = t.explore.items[f.key];
          return (
            <Reveal key={f.key} delay={i * 80} className="h-full">
              <Link
                href={f.href}
                className="card card-hover feature-card group flex h-full flex-col rounded-3xl p-7"
              >
                <span className="feature-icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-2">
                  {item.desc}
                </p>
                <span className="feature-cta mt-6">
                  {item.cta}
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
