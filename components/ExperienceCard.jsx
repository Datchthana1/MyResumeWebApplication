"use client";
import Image from "next/image";

export default function ExperienceCard({
  title,
  details,
  labels,
  index,
  setLightbox,
  setClosing,
}) {
  return (
    <div
      className="card card-hover rounded-3xl p-8 mb-6 flex flex-col gap-4 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div>
        <h2 className="text-xl font-bold text-neutral-950">{title}</h2>
        {details.org && (
          <p className="text-sm text-neutral-500 mt-1">{details.org}</p>
        )}
      </div>

      {/* Photos */}
      {details.picture && (
        <div className="flex flex-wrap md:flex-row gap-4 justify-center items-center">
          {details.picture.map((pic, idx) => (
            <Image
              key={idx}
              src={pic}
              height={200}
              className="rounded-2xl mb-4 cursor-pointer ring-1 ring-black/5 hover:ring-black/15 transition"
              alt={`${title} photo ${idx + 1}`}
              onClick={() => {
                setLightbox({ isOpen: true, src: pic });
                setClosing(false);
              }}
            />
          ))}
        </div>
      )}

      {/* Description */}
      {details.paragraphs?.length > 0 && (
        <div>
          <h3 className="font-semibold text-neutral-950">
            {labels.descriptionLabel}
          </h3>
          <div className="mt-1 space-y-3">
            {details.paragraphs.map((p, i) => (
              <p key={i} className="text-neutral-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Tools */}
      {details.Tools && (
        <div>
          <h3 className="font-semibold mt-2 text-neutral-950">
            {labels.toolsLabel}
          </h3>
          <ul className="flex flex-row flex-wrap gap-2 justify-start mt-2">
            {details.Tools.map((tool, i) => (
              <li
                key={i}
                className="list-none card-thin text-neutral-700 px-3 py-1 rounded-full w-fit text-sm"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      {details.link && (
        <div>
          <h3 className="font-semibold mt-2 text-neutral-950">
            {labels.linksLabel}
          </h3>
          <ul className="text-left flex flex-col md:flex-row flex-wrap gap-5 mt-2">
            {Object.entries(details.link).map(([label, url], idx) => (
              <li key={idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 underline underline-offset-4 hover:text-black transition-colors"
                >
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
