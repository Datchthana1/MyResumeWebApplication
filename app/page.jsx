import Image from "next/image";
import Link from "next/link";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/Reveal";

const positions = [
  "Data Scientist / Engineer",
  "Web Developer",
  "Chatbot Developer",
];

const socials = [
  { label: "GitHub", href: "https://github.com/Datchthana1" },
  { label: "Facebook", href: "https://www.facebook.com/datchtana.arunchaiya/" },
  { label: "Medium", href: "https://medium.com/@kaiza941" },
];

const programming = ["Python", "JavaScript", "SQL"];
const dataTools = [
  "pandas",
  "NumPy",
  "scikit-learn",
  "XGBoost",
  "LightGBM",
  "CatBoost",
  "PyTorch",
  "Matplotlib",
  "Seaborn",
];
const platforms = ["Google Cloud Platform", "Vertex AI", "Dataform", "Next.js"];
const spoken = [
  { lang: "Thai", level: "Native" },
  { lang: "English", level: "B1 — Intermediate" },
];

const experiences = [
  {
    role: "Data Scientist",
    org: "Thesis Project — Walailak University",
    period: "Final-year research",
    summary:
      "Built ML models to predict pain levels from physiological signals (HR, EDA, HRV, Skin Temperature) using Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM and CatBoost. Best model reached 83.2% accuracy with XGBoost.",
    tags: ["Machine Learning", "XGBoost", "Signal Processing", "Research"],
  },
  {
    role: "Data Engineer (Intern)",
    org: "Greenline Synergy Co., Ltd.",
    period: "Internship",
    summary:
      "Developed financial & large-scale data processing pipelines for hospitals, performed data validation to ensure quality, and built a chatbot on Google Cloud to assist medical coders — improving efficiency and reducing data-entry errors.",
    tags: ["ETL", "Data Validation", "GCP", "Chatbot"],
  },
  {
    role: "Web Developer",
    org: "Personal Projects",
    period: "Ongoing",
    summary:
      "Designing and building personal web projects (including this portfolio) with Next.js and React to sharpen front-end and full-stack engineering skills.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
];

function Pill({ children }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-white/80 hover:border-violet-400/40 hover:text-white transition-colors">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-violet-400/80 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="relative font-sans overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob blob-1 bg-indigo-600/40 w-[480px] h-[480px] top-[-120px] left-[-120px]" />
        <div className="blob blob-2 bg-cyan-500/30 w-[420px] h-[420px] top-[40%] right-[-100px]" />
        <div className="blob blob-1 bg-violet-600/25 w-[380px] h-[380px] bottom-[-120px] left-[30%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.12),transparent_60%)]" />
      </div>

      {/* ============================ HERO ============================ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500 to-cyan-400 blur-xl opacity-60" />
            <Image
              src={Dechthana}
              alt="Dechthana Arunchaiya"
              width={140}
              height={140}
              priority
              className="relative rounded-full ring-2 ring-white/20 object-cover w-[140px] h-[140px]"
            />
          </div>

          <p className="font-mono text-sm text-white/60 mb-4">
            Hi, I&apos;m
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Dechthana <span className="text-gradient-animated">Arunchaiya</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-white/70">
            {positions.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-violet-400/60">&middot;</span>
                )}
                {p}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-xl mx-auto text-white/60 leading-relaxed">
            Turning data into insight and ideas into products — passionate about
            data science, engineering, and building things for the web.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#experience"
              className="px-6 py-3 rounded-full font-medium text-white bg-linear-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full font-medium text-white/90 glass glass-hover"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-5 text-sm">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounceDown">
          <span className="text-2xl">&#8595;</span>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="01 / About" title="About Me" />
        </Reveal>
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <Reveal className="md:col-span-3">
            <div className="glass glass-hover ring-gradient rounded-3xl p-8">
              <p className="text-white/75 leading-relaxed">
                I&apos;m a student at{" "}
                <span className="text-white font-medium">
                  Walailak University
                </span>
                , majoring in Innovation of Medical Informatics. I have a strong
                passion for data science, data engineering, and web development.
                I love learning new technologies and applying them to solve
                real-world problems.
              </p>
              <p className="text-white/75 leading-relaxed mt-4">
                My goal is to become a proficient data scientist and researcher,
                and to contribute to impactful projects that make a difference.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="glass glass-hover rounded-3xl p-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-violet-400/80 mb-4">
                Languages
              </h3>
              <ul className="space-y-3">
                {spoken.map((s) => (
                  <li key={s.lang} className="flex items-center justify-between">
                    <span className="text-white/85">{s.lang}</span>
                    <span className="text-sm text-white/50">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ SKILLS ============================ */}
      <section id="skills" className="relative max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="02 / Skills" title="Tech & Tools" />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Languages", items: programming },
            { title: "Data Science", items: dataTools },
            { title: "Platforms", items: platforms },
          ].map((group, i) => (
            <Reveal key={group.title} delay={i * 120}>
              <div className="glass glass-hover ring-gradient rounded-3xl p-7 h-full">
                <h3 className="text-sm font-mono uppercase tracking-widest text-violet-400/80 mb-5">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================= EXPERIENCE ========================= */}
      <section id="experience" className="relative max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="03 / Experience" title="What I've Done" />
        </Reveal>

        <div className="relative space-y-6">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 100}>
              <article className="glass glass-hover ring-gradient rounded-3xl p-7 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-mono text-violet-400/70">
                    {exp.period}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-4">{exp.org}</p>
                <p className="text-white/75 leading-relaxed">{exp.summary}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 text-center">
            <Link
              href="/Experience"
              className="inline-flex items-center gap-2 text-violet-300 hover:text-white transition-colors"
            >
              See detailed experience with photos
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="relative max-w-3xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="04 / Contact" title="Let's Connect" />
        </Reveal>
        <Reveal delay={100}>
          <div className="glass ring-gradient rounded-3xl p-8 sm:p-10">
            <p className="text-white/70 leading-relaxed mb-8">
              Have a project, opportunity, or just want to say hi? I&apos;d love
              to hear from you.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-violet-400/70 mb-1">
                  Email (Formal)
                </p>
                <a
                  href="mailto:Dechthana.ar@mail.wu.ac.th"
                  className="text-white/90 hover:text-gradient break-all"
                >
                  Dechthana.ar@mail.wu.ac.th
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-violet-400/70 mb-1">
                  Email (Personal)
                </p>
                <a
                  href="mailto:Kaiza941@gmail.com"
                  className="text-white/90 hover:text-gradient break-all"
                >
                  Kaiza941@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-violet-400/70 mb-1">
                  Location
                </p>
                <p className="text-white/90">Hatyai, Thailand</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-violet-400/70 mb-1">
                  Find Me
                </p>
                <div className="flex gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white underline-offset-4 hover:underline"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="h-16" />
    </div>
  );
}
