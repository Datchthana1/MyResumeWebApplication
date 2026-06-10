"use client";
import Image from "next/image";

export default function ExperienceCard({
  title,
  details,
  index,
  setLightbox,
  setClosing,
}) {
  return (
    <div
      className="glass glass-hover ring-gradient rounded-3xl p-8 mb-6 flex flex-col gap-4 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <h2 className="relative z-10 text-xl font-bold text-slate-900 text-center">
        {title}
      </h2>

      {/* รูปภาพ */}
      {details.picture && (
        <div className="relative z-10 flex flex-wrap md:flex-row gap-4 justify-center items-center">
          {details.picture.map((pic, idx) => (
            <Image
              key={idx}
              src={pic}
              height={200}
              className="rounded-2xl mb-4 cursor-pointer"
              alt={`picture-${idx}`}
              onClick={() => {
                setLightbox({ isOpen: true, src: pic });
                setClosing(false);
              }}
            />
          ))}
        </div>
      )}

      {/* คำอธิบาย */}
      <div className="relative z-10">
        <h3 className="font-semibold mt-2 text-slate-900">Description:</h3>
        <p className="text-slate-600">{details.description}</p>
      </div>

      {/* Tools */}
      {details.Tools && (
        <div className="relative z-10">
          <h3 className="font-semibold mt-2 text-slate-900">Tools:</h3>
          <ul className="flex flex-row flex-wrap gap-2 justify-start mt-2">
            {details.Tools.map((tool, i) => (
              <li
                key={i}
                className="list-none glass-thin text-slate-700 px-3 py-1 rounded-full w-fit text-sm"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      {details.link && (
        <div className="relative z-10">
          <h3 className="font-semibold mt-2 text-slate-900">Links:</h3>
          <ul className="list-disc list-inside text-slate-900 text-left flex flex-col md:flex-row flex-wrap gap-5">
            {Object.entries(details.link).map(([label, url], idx) => (
              <li key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
