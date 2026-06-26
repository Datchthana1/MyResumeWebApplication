"use client";
import Link from "next/link";
import CompetitionContest from "@/assets/CompetitionContest.jpg";
import ProcedureOfDemostration from "@/assets/ProcedureOfDemostration.webp";
import VibeInContest from "@/assets/VibeInContest.jpg";
import { useEffect, useState } from "react";
import ExperienceList from "@/components/ExperienceList";
import Lightbox from "@/components/LightBox";
import GLS_Logo2 from "@/assets/GLS_Logo2.jpg";
import GLS_Vibe from "@/assets/GLS_Vibe.jpg";
import { useLang } from "@/components/LanguageProvider";

const Page = () => {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState({ isOpen: false, src: null });
  const [closing, setClosing] = useState(false);

  // Visuals/tools/links are language-agnostic; copy (org + paragraphs) comes
  // from `t`. Each key matches an entry in t.experienceDetail.items.
  const items = t.experienceDetail.items;
  const visuals = {
    "Data Engineer @ Greenline Synergy": {
      Tools: ["SQL", "Google Cloud Platform", "Dataform", "BigQuery"],
      picture: [GLS_Logo2, GLS_Vibe],
    },
    "AI Engineer @ Greenline Synergy": {
      Tools: [
        "RAG",
        "AI Agents",
        "n8n",
        "Fine-tuning",
        "LLM",
        "Vertex AI",
        "Vector Search",
      ],
    },
    "Data Scientist — Thesis Project": {
      Tools: [
        "pandas",
        "NumPy",
        "scikit-learn",
        "XGBoost",
        "LightGBM",
        "CatBoost",
        "Matplotlib",
        "Seaborn",
        "PyTorch",
      ],
      link: {
        I_NewGen:
          "https://www.wu.ac.th/index.php/th/news/25143/index.html?utm_source=chatgpt.com",
        Medium:
          "https://medium.com/@kaiza941/%E0%B8%AD%E0%B8%B8%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B9%87%E0%B8%9A%E0%B8%9B%E0%B8%A7%E0%B8%94-728d043f6af1",
      },
      picture: [VibeInContest, CompetitionContest, ProcedureOfDemostration],
    },
  };

  const Experience = Object.fromEntries(
    Object.keys(visuals).map((key) => [
      key,
      {
        org: items[key]?.org,
        paragraphs: items[key]?.paragraphs ?? [],
        ...visuals[key],
      },
    ])
  );

  const closeLightbox = () => {
    setClosing(true);
    setTimeout(() => {
      setLightbox({ isOpen: false, src: null });
      setClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [lightbox.isOpen]);

  return (
    <div className="relative font-sans min-h-screen text-neutral-900 px-5 pt-28 pb-16">
      <div className="max-w-5xl mx-auto mb-8">
        <p className="kicker mb-3 flex items-center gap-2">
          <span className="signal-dot" />
          {t.experienceDetail.eyebrow}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
          {t.experienceDetail.title}
        </h1>
        <Link
          href="/#experience"
          className="link-underline inline-flex items-center gap-2 mt-4 text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
        >
          <span aria-hidden>&larr;</span>
          {t.ui.backToHome}
        </Link>
      </div>

      <div className="grid gap-8">
        <ExperienceList
          Experience={Experience}
          labels={t.experienceDetail}
          setLightbox={setLightbox}
          setClosing={setClosing}
        />

        <Lightbox
          lightbox={lightbox}
          closing={closing}
          closeLightbox={closeLightbox}
        />
      </div>
    </div>
  );
};

export default Page;
