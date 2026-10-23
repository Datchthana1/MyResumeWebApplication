"use client";
import BackLink from "@/components/ui/BackLink";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/providers/LanguageProvider";

/* The top of every sub-page (/Experience, /chat, /monitor): a back link, then
   the same eyebrow + h1 + blurb treatment as home-page sections, so moving
   between pages feels like one continuous document. */
export default function PageHeader({ eyebrow, title, blurb, backHref, actions }) {
  const { t } = useLang();
  return (
    <header className="mb-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <BackLink href={backHref}>{t.ui.backToHome}</BackLink>
        {actions}
      </div>
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          blurb={blurb}
          className=""
        />
      </Reveal>
    </header>
  );
}
