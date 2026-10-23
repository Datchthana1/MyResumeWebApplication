"use client";

import { MonitorBoard } from "@/components/monitor/Monitor";
import { EarthquakeBoard } from "@/components/monitor/Earthquake";
import PageHeader from "@/components/ui/PageHeader";
import Waypoint from "@/components/ui/Waypoint";
import { useLang } from "@/providers/LanguageProvider";

export default function MonitorPage() {
  const { lang, t } = useLang();

  return (
    <div className="relative min-h-screen px-6 pb-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          backHref="/#monitor"
          eyebrow={t.monitor.eyebrow}
          title={t.monitor.title}
          blurb={t.monitor.subtitle}
        />

        <MonitorBoard />

        <Waypoint className="my-14" />

        <EarthquakeBoard lang={lang} m={t.monitor} />
      </div>
    </div>
  );
}
