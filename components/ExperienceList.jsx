"use client";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceList({
  Experience,
  setLightbox,
  setClosing,
}) {
  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 px-5 pt-5 space-y-6 min-w-sc">
      <div className="max-w-5xl mx-auto px-6 animate-fadeInUp">
        {Object.entries(Experience).map(([title, details], index) => (
          <ExperienceCard
            key={index}
            title={title}
            details={details}
            index={index}
            setLightbox={setLightbox}
            setClosing={setClosing}
          />
        ))}
      </div>
    </div>
  );
}
