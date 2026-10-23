"use client";
import PageHeader from "@/components/ui/PageHeader";
import ExperienceList from "@/components/experience/ExperienceList";
import experienceMedia from "@/content/experienceMedia";
import { useLang } from "@/providers/LanguageProvider";

const Page = () => {
  const { t } = useLang();
  const { items } = t.experienceDetail;

  // Merge language-specific copy (org, paragraphs) with the shared media.
  const entries = Object.entries(experienceMedia).map(([title, media]) => ({
    title,
    org: items[title]?.org,
    paragraphs: items[title]?.paragraphs ?? [],
    tools: media.tools,
    links: media.links,
    pictures: media.pictures,
  }));

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 pb-20 sm:px-6">
      <PageHeader
        eyebrow={t.experienceDetail.eyebrow}
        title={t.experienceDetail.title}
        backHref="/#experience"
      />
      <ExperienceList entries={entries} labels={t.experienceDetail} />
    </div>
  );
};

export default Page;
