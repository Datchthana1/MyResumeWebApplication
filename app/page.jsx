import Image from "next/image";
import Link from "next/link";
import Dechthana from "@/assets/Dechthana.jpg";
import Reveal from "@/components/Reveal";

const positions = [
  "Data Engineer (AI Engineer)",
  "Data Scientist",
  "Web Developer",
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
const aiTools = [
  "LLM / RAG",
  "Fine-tuning",
  "AI Agents",
  "n8n",
  "Vector Search",
  "Hugging Face",
];
const platforms = [
  "Google Cloud Platform",
  "Vertex AI",
  "Apache Airflow",
  "n8n",
  "Supabase",
  "Dataform",
  "Next.js",
];

const education = [
  {
    degree: "B.Sc. in Innovation of Medical Informatics",
    school: "Walailak University",
    period: "2021 (B.E. 2564) – Present",
    detail:
      "Studying the intersection of healthcare, data and software — covering data science, data engineering and medical information systems.",
  },
];
const spoken = [
  { lang: "Thai", level: "Native" },
  { lang: "English", level: "B1 — Intermediate" },
];

const experiences = [
  {
    role: "Data Engineer",
    org: "Greenline Synergy Co., Ltd.",
    period: "Intern (Apr–Dec 2025) → Full-time (Dec 2025 – Present)",
    summary:
      "I joined Greenline Synergy as a Data Engineering intern (Apr–Dec 2025) and was then converted to a full-time Data Engineer (Dec 2025 – Present). I build and maintain large-scale financial and healthcare data transformation pipelines for hospitals — designing ETL/ELT flows that ingest data from multiple sources, transforming it into clean, structured datasets, and performing data validation to guarantee quality and reliability for downstream analytics.",
    tags: [
      "ETL / ELT",
      "Data Transformation",
      "Data Validation",
      "SQL",
      "Dataform",
      "GCP",
    ],
  },
  {
    role: "Data Engineer — AI Engineer",
    org: "Greenline Synergy Co., Ltd.",
    period: "Full-time · Dec 2025 – Present",
    summary:
      "Within the same Data Engineering role at Greenline Synergy, I also work as an AI Engineer building AI systems that go beyond simple prompting. I design and ship Retrieval-Augmented Generation (RAG) systems grounded in real documents and knowledge bases, multi-tool / workflow agents that call functions and chain steps to complete tasks autonomously (including automation built with n8n), and fine-tuned domain-specific LLMs for medical use cases such as assisting medical coders — with a focus on making them accurate, reliable and genuinely useful in production.",
    tags: [
      "RAG",
      "AI Agents",
      "n8n",
      "Fine-tuning",
      "LLM",
      "Vertex AI",
      "Vector Search",
    ],
  },
  {
    role: "Data Scientist — Thesis Project",
    org: "Walailak University",
    period: "2024 – 2025 (3rd year)",
    summary:
      "My thesis project: built ML models to predict pain levels from physiological signals (HR, EDA, HRV, Skin Temperature) using Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM and CatBoost. The best model reached 83.2% accuracy with XGBoost, showing the approach can be applied effectively in medical research.",
    tags: ["Machine Learning", "XGBoost", "Signal Processing", "Research"],
  },
  {
    role: "Air Station Data Pipeline",
    org: "Personal Data Engineering Project",
    period: "Ongoing",
    summary:
      "An end-to-end data pipeline that collects air-quality data (such as PM2.5 and related metrics) from the OpenWeather and Air4Thai APIs. The ingestion, cleaning and transformation steps are orchestrated with Apache Airflow as scheduled DAGs that run on a daily basis, and the processed results are stored in Supabase so the data stays consistent, queryable and ready for analysis and visualisation.",
    tags: [
      "Apache Airflow",
      "Supabase",
      "OpenWeather",
      "Air4Thai",
      "ETL",
      "Python",
    ],
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
    <span className="px-3 py-1.5 rounded-full text-sm glass-thin text-slate-700 hover:text-slate-900 transition-colors">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-indigo-500/90 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="relative font-sans overflow-hidden">
      {/* Pastel light behind the glass */}
      <div className="fixed inset-0 -z-10">
        <div className="blob blob-1 bg-indigo-300 w-[480px] h-[480px] top-[-120px] left-[-120px]" />
        <div className="blob blob-2 bg-sky-300 w-[420px] h-[420px] top-[35%] right-[-100px]" />
        <div className="blob blob-1 bg-purple-300 w-[380px] h-[380px] bottom-[-120px] left-[28%]" />
        <div className="blob blob-2 bg-rose-200 w-[320px] h-[320px] top-[60%] left-[-80px]" />
      </div>

      {/* ============================ HERO ============================ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-400 to-sky-300 blur-xl opacity-70" />
            <Image
              src={Dechthana}
              alt="Dechthana Arunchaiya"
              width={140}
              height={140}
              priority
              className="relative rounded-full ring-2 ring-white/80 shadow-xl object-cover w-[140px] h-[140px]"
            />
          </div>

          <p className="font-mono text-sm text-slate-500 mb-4">Hi, I&apos;m</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Dechthana <span className="text-gradient-animated">Arunchaiya</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-slate-600">
            {positions.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {i > 0 && <span className="text-indigo-400/70">&middot;</span>}
                {p}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-xl mx-auto text-slate-500 leading-relaxed">
            Turning data into insight and ideas into products — passionate about
            data science, engineering, and building things for the web.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#experience"
              className="px-6 py-3 rounded-full font-medium text-white bg-linear-to-r from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full font-medium text-slate-800 glass glass-hover"
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
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 animate-bounceDown">
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
              <p className="relative z-10 text-slate-600 leading-relaxed">
                I&apos;m a{" "}
                <span className="text-slate-900 font-medium">
                  Data Engineer working on AI
                </span>{" "}
                at Greenline Synergy, and a student of Innovation of Medical
                Informatics at Walailak University. I have a strong passion for
                data science, data engineering, and building AI systems that are
                genuinely useful in production.
              </p>
              <p className="relative z-10 text-slate-600 leading-relaxed mt-4">
                My goal is to become a proficient data scientist and researcher,
                and to contribute to impactful projects that make a difference.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="glass glass-hover rounded-3xl p-8">
              <h3 className="relative z-10 text-sm font-mono uppercase tracking-widest text-indigo-500/90 mb-4">
                Languages
              </h3>
              <ul className="relative z-10 space-y-3">
                {spoken.map((s) => (
                  <li key={s.lang} className="flex items-center justify-between">
                    <span className="text-slate-800">{s.lang}</span>
                    <span className="text-sm text-slate-500">{s.level}</span>
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
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Languages", items: programming },
            { title: "AI / LLM", items: aiTools },
            { title: "Data Science", items: dataTools },
            { title: "Platforms", items: platforms },
          ].map((group, i) => (
            <Reveal key={group.title} delay={i * 120}>
              <div className="glass glass-hover ring-gradient rounded-3xl p-7 h-full">
                <h3 className="relative z-10 text-sm font-mono uppercase tracking-widest text-indigo-500/90 mb-5">
                  {group.title}
                </h3>
                <div className="relative z-10 flex flex-wrap gap-2.5">
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
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-mono text-indigo-500/80">
                    {exp.period}
                  </span>
                </div>
                <p className="relative z-10 text-slate-500 text-sm mb-4">
                  {exp.org}
                </p>
                <p className="relative z-10 text-slate-600 leading-relaxed">
                  {exp.summary}
                </p>
                <div className="relative z-10 flex flex-wrap gap-2 mt-5">
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
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              See detailed experience with photos
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================ EDUCATION ============================ */}
      <section id="education" className="relative max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="04 / Education" title="Education" />
        </Reveal>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 100}>
              <article className="glass glass-hover ring-gradient rounded-3xl p-7 sm:p-8">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-mono text-indigo-500/80">
                    {edu.period}
                  </span>
                </div>
                <p className="relative z-10 text-slate-500 text-sm mb-4">
                  {edu.school}
                </p>
                <p className="relative z-10 text-slate-600 leading-relaxed">
                  {edu.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="relative max-w-3xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="05 / Contact" title="Let's Connect" />
        </Reveal>
        <Reveal delay={100}>
          <div className="glass ring-gradient rounded-3xl p-8 sm:p-10">
            <p className="relative z-10 text-slate-600 leading-relaxed mb-8">
              Have a project, opportunity, or just want to say hi? I&apos;d love
              to hear from you.
            </p>
            <div className="relative z-10 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500/80 mb-1">
                  Email (Formal)
                </p>
                <a
                  href="mailto:Dechthana.ar@mail.wu.ac.th"
                  className="text-slate-800 hover:text-indigo-600 break-all transition-colors"
                >
                  Dechthana.ar@mail.wu.ac.th
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500/80 mb-1">
                  Email (Personal)
                </p>
                <a
                  href="mailto:Kaiza941@gmail.com"
                  className="text-slate-800 hover:text-indigo-600 break-all transition-colors"
                >
                  Kaiza941@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500/80 mb-1">
                  Location
                </p>
                <p className="text-slate-800">Hatyai, Thailand</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500/80 mb-1">
                  Find Me
                </p>
                <div className="flex gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:text-indigo-600 underline-offset-4 hover:underline transition-colors"
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
