"use client";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CopyButton from "@/components/home/CopyButton";
import { CONTACT } from "@/config/site";
import { useLang } from "@/providers/LanguageProvider";

export default function Contact() {
  const { t } = useLang();

  return (
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
          <div className="mb-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl leading-relaxed text-ink-2">{t.contact.intro}</p>
            <a
              href={`mailto:${CONTACT.emailPersonal}`}
              className="btn btn-spark shrink-0"
            >
              {t.ui.getInTouch}
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="kicker mb-1">{t.contact.emailFormalLabel}</p>
              <a
                href={`mailto:${CONTACT.emailFormal}`}
                className="link-underline break-all text-ink transition-colors hover:text-spark-ink"
              >
                {CONTACT.emailFormal}
              </a>
              <div className="mt-2">
                <CopyButton value={CONTACT.emailFormal} />
              </div>
            </div>
            <div>
              <p className="kicker mb-1">{t.contact.emailPersonalLabel}</p>
              <a
                href={`mailto:${CONTACT.emailPersonal}`}
                className="link-underline break-all text-ink transition-colors hover:text-spark-ink"
              >
                {CONTACT.emailPersonal}
              </a>
              <div className="mt-2">
                <CopyButton value={CONTACT.emailPersonal} />
              </div>
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
  );
}
