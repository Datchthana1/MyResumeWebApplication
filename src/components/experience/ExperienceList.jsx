"use client";
import Reveal from "@/components/ui/Reveal";
import ExperienceCard from "@/components/experience/ExperienceCard";

export default function ExperienceList({ entries, labels }) {
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <Reveal key={entry.title}>
          <ExperienceCard {...entry} labels={labels} />
        </Reveal>
      ))}
    </div>
  );
}
