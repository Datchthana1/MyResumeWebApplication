"use client";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceList({
  Experience,
  labels,
  setLightbox,
  setClosing,
}) {
  return (
    <div className="font-sans text-neutral-900 space-y-6">
      <div className="max-w-5xl mx-auto animate-fadeInUp">
        {Object.entries(Experience).map(([title, details], index) => (
          <ExperienceCard
            key={index}
            title={title}
            details={details}
            labels={labels}
            index={index}
            setLightbox={setLightbox}
            setClosing={setClosing}
          />
        ))}
      </div>
    </div>
  );
}
