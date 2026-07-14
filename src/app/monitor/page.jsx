"use client";

import Link from "next/link";
import { MonitorBoard } from "@/components/monitor/Monitor";
import { EarthquakeBoard } from "@/components/monitor/Earthquake";
import { useLang } from "@/providers/LanguageProvider";

export default function MonitorPage() {
  const { lang, t } = useLang();

  return (
    <div className="relative min-h-screen px-6 pb-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#monitor"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
        >
          <span aria-hidden>&larr;</span>
          {t.ui.backToHome}
        </Link>

        <MonitorBoard />

        <div className="my-14 border-t border-black/8" />

        <EarthquakeBoard lang={lang} m={t.monitor} />
      </div>
    </div>
  );
}
