// Bilingual content for the whole site. Tool / tech names stay in English in
// both languages because they're proper nouns. Edit copy here, not in components.

// Tech/tool lists are language-agnostic (proper nouns) — defined once, reused.
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

const socials = [
  { label: "GitHub", href: "https://github.com/Datchthana1" },
  { label: "Facebook", href: "https://www.facebook.com/datchtana.arunchaiya/" },
  { label: "Medium", href: "https://medium.com/@kaiza941" },
];

export const content = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    },
    ui: {
      viewWork: "View My Work",
      getInTouch: "Get in Touch",
      seeDetailedExperience: "See detailed experience with photos",
      backToHome: "Back to home",
    },
    hero: {
      greeting: "Hello, my name is",
      firstName: "Dechthana",
      lastName: "Arunchaiya",
      positions: ["Data Engineer (AI Engineer)", "Data Scientist", "Web Developer"],
      tagline:
        "Turning data into insight and ideas into products — passionate about data science, engineering, and building things for the web.",
    },
    about: {
      eyebrow: "01 / About",
      title: "About Me",
      paragraphs: [
        "I'm a Data Engineer working on AI at Greenline Synergy, and a 2025 graduate in Innovation of Medical Informatics from Walailak University. I have a strong passion for data science, data engineering, and building AI systems that are genuinely useful in production.",
        "My goal is to become a proficient data scientist and researcher, and to contribute to impactful projects that make a difference.",
      ],
      highlight: "Data Engineer working on AI",
      languagesLabel: "Languages",
      spoken: [
        { lang: "Thai", level: "Native" },
        { lang: "English", level: "B1 (CUTEP, Certificate · 2026)" },
      ],
    },
    skills: {
      eyebrow: "02 / Skills",
      title: "Tech & Tools",
      groups: [
        { title: "Languages", items: programming },
        { title: "AI / LLM", items: aiTools },
        { title: "Data Science", items: dataTools },
        { title: "Platforms", items: platforms },
      ],
    },
    experience: {
      eyebrow: "03 / Experience",
      title: "What I've Done",
      items: [
        {
          role: "Data Engineer",
          org: "Greenline Synergy Co., Ltd.",
          period: "Intern (Apr–Dec 2025) → Full-time (Dec 2025 – Present)",
          summary:
            "I joined Greenline Synergy as a Data Engineering intern (Apr–Dec 2025) and was then converted to a full-time Data Engineer (Dec 2025 – Present). I build and maintain large-scale financial and healthcare data transformation pipelines for hospitals — designing ETL/ELT flows that ingest data from multiple sources, transforming it into clean, structured datasets, and performing data validation to guarantee quality and reliability for downstream analytics.",
          tags: ["ETL / ELT", "Data Transformation", "Data Validation", "SQL", "Dataform", "GCP"],
        },
        {
          role: "Data Engineer — AI Engineer",
          org: "Greenline Synergy Co., Ltd.",
          period: "Full-time · Dec 2025 – Present",
          summary:
            "Within the same Data Engineering role at Greenline Synergy, I also work as an AI Engineer building AI systems that go beyond simple prompting. I design and ship Retrieval-Augmented Generation (RAG) systems grounded in real documents and knowledge bases, multi-tool / workflow agents that call functions and chain steps to complete tasks autonomously (including automation built with n8n), and fine-tuned domain-specific LLMs for medical use cases such as assisting medical coders — with a focus on making them accurate, reliable and genuinely useful in production.",
          tags: ["RAG", "AI Agents", "n8n", "Fine-tuning", "LLM", "Vertex AI", "Vector Search"],
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
          tags: ["Apache Airflow", "Supabase", "OpenWeather", "Air4Thai", "ETL", "Python"],
        },
        {
          role: "Web Developer",
          org: "Personal Projects",
          period: "Ongoing",
          summary:
            "Designing and building personal web projects (including this portfolio) with Next.js and React to sharpen front-end and full-stack engineering skills.",
          tags: ["Next.js", "React", "Tailwind CSS"],
        },
      ],
    },
    education: {
      eyebrow: "04 / Education",
      title: "Education",
      items: [
        {
          degree: "B.Sc. in Innovation of Medical Informatics",
          school: "Walailak University",
          period: "2021 – 2025",
          detail:
            "Graduated in 2025. Studied the intersection of healthcare, data and software — covering data science, data engineering and medical information systems.",
        },
      ],
    },
    contact: {
      eyebrow: "05 / Contact",
      title: "Let's Connect",
      intro:
        "Have a project, opportunity, or just want to say hi? I'd love to hear from you.",
      emailFormalLabel: "Email (Formal)",
      emailPersonalLabel: "Email (Personal)",
      locationLabel: "Location",
      location: "Hatyai, Thailand",
      findMeLabel: "Find Me",
    },
    experienceDetail: {
      eyebrow: "Experience",
      title: "Experience in Detail",
      descriptionLabel: "Description",
      toolsLabel: "Tools",
      linksLabel: "Links",
      items: {
        "Data Engineer @ Greenline Synergy": {
          org: "Greenline Synergy Co., Ltd. · Intern (Apr–Dec 2025) → Full-time (Dec 2025 – Present)",
          paragraphs: [
            "I started at Greenline Synergy as a Data Engineering intern and was later brought on full-time as a Data Engineer. My core responsibility is building and maintaining large-scale financial and healthcare data pipelines for hospitals.",
            "Day to day, I design ETL/ELT flows that ingest data from many different source systems, transform it into clean and well-structured datasets, and model it for downstream analytics. I rely heavily on SQL and Dataform on Google Cloud Platform to keep transformations modular, version-controlled and testable.",
            "A big part of the role is data validation — writing checks and assertions that guarantee the data is accurate, consistent and reliable before it reaches reporting and analytics, since this is financial and clinical data where mistakes are costly.",
          ],
        },
        "AI Engineer @ Greenline Synergy": {
          org: "Greenline Synergy Co., Ltd. · Full-time · Dec 2025 – Present",
          paragraphs: [
            "Within the same role at Greenline Synergy, I also work as an AI Engineer, building AI systems that go well beyond simple prompting and are meant to run reliably in production.",
            "I design and ship Retrieval-Augmented Generation (RAG) systems that are grounded in the company's real documents and knowledge bases, so answers are based on actual sources rather than the model guessing. I also build multi-tool / workflow agents that call functions and chain steps together to complete tasks autonomously — including automation pipelines built with n8n.",
            "On top of that, I fine-tune domain-specific LLMs for medical use cases, such as assisting medical coders with Medical Coding. The focus across all of this is accuracy, reliability and real usefulness — AI that genuinely helps the team, not just demos.",
          ],
        },
        "Data Scientist — Thesis Project": {
          org: "Walailak University · 2024 – 2025",
          paragraphs: [
            "For my senior thesis I applied Machine Learning to predict pain levels from physiological signals — Heart Rate (HR), Electrodermal Activity (EDA), Heart Rate Variability (HRV) and Skin Temperature (ST).",
            "I trained and compared a range of models — Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM and CatBoost — to find the most accurate approach. The best model reached 83.2% accuracy with XGBoost, a promising result showing the method can be applied effectively in medical research.",
          ],
        },
      },
    },
    footer: {
      builtWith: "Built with Next.js & Tailwind CSS",
    },
    socials,
  },

  th: {
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับ",
      skills: "ทักษะ",
      experience: "ประสบการณ์",
      education: "การศึกษา",
      contact: "ติดต่อ",
    },
    ui: {
      viewWork: "ดูผลงานของผม",
      getInTouch: "ติดต่อผม",
      seeDetailedExperience: "ดูประสบการณ์แบบละเอียดพร้อมรูปภาพ",
      backToHome: "กลับหน้าแรก",
    },
    hero: {
      greeting: "สวัสดีครับ ผมชื่อ",
      firstName: "เดชธนา",
      lastName: "อรัญชัยยะ",
      positions: ["Data Engineer (AI Engineer)", "Data Scientist", "Web Developer"],
      tagline:
        "เปลี่ยนข้อมูลให้เป็นข้อมูลเชิงลึก และเปลี่ยนไอเดียให้เป็นผลิตภัณฑ์ — หลงใหลในงานด้าน Data Science, Data Engineering และการสร้างสรรค์งานบนเว็บ",
    },
    about: {
      eyebrow: "01 / เกี่ยวกับ",
      title: "เกี่ยวกับผม",
      paragraphs: [
        "ผมเป็น Data Engineer ที่ทำงานด้าน AI ที่ Greenline Synergy และเป็นบัณฑิตปี 2025 สาขานวัตกรรมสารสนเทศการแพทย์ จากมหาวิทยาลัยวลัยลักษณ์ ผมมีความหลงใหลอย่างมากในงานด้าน Data Science, Data Engineering และการสร้างระบบ AI ที่ใช้งานได้จริงในระดับ Production",
        "เป้าหมายของผมคือการเป็น Data Scientist และนักวิจัยที่เชี่ยวชาญ และได้มีส่วนร่วมในโปรเจกต์ที่สร้างผลกระทบและความเปลี่ยนแปลงที่ดี",
      ],
      highlight: "Data Engineer ที่ทำงานด้าน AI",
      languagesLabel: "ภาษา",
      spoken: [
        { lang: "ไทย", level: "ภาษาแม่" },
        { lang: "อังกฤษ", level: "B1 (CUTEP, ใบรับรอง · 2026)" },
      ],
    },
    skills: {
      eyebrow: "02 / ทักษะ",
      title: "เทคโนโลยีและเครื่องมือ",
      groups: [
        { title: "ภาษาโปรแกรม", items: programming },
        { title: "AI / LLM", items: aiTools },
        { title: "Data Science", items: dataTools },
        { title: "แพลตฟอร์ม", items: platforms },
      ],
    },
    experience: {
      eyebrow: "03 / ประสบการณ์",
      title: "สิ่งที่ผมทำมา",
      items: [
        {
          role: "Data Engineer",
          org: "บริษัท Greenline Synergy จำกัด",
          period: "ฝึกงาน (เม.ย.–ธ.ค. 2025) → พนักงานประจำ (ธ.ค. 2025 – ปัจจุบัน)",
          summary:
            "ผมเริ่มที่ Greenline Synergy ในฐานะนักศึกษาฝึกงานด้าน Data Engineering (เม.ย.–ธ.ค. 2025) ก่อนได้รับการบรรจุเป็น Data Engineer เต็มเวลา (ธ.ค. 2025 – ปัจจุบัน) ผมพัฒนาและดูแลระบบ Pipeline สำหรับแปลงข้อมูลทางการเงินและข้อมูลสุขภาพขนาดใหญ่ให้กับโรงพยาบาล — ออกแบบกระบวนการ ETL/ELT ที่ดึงข้อมูลจากหลายแหล่ง แปลงให้เป็นชุดข้อมูลที่สะอาดและมีโครงสร้าง พร้อมทำ Data Validation เพื่อรับประกันคุณภาพและความน่าเชื่อถือสำหรับงานวิเคราะห์ปลายทาง",
          tags: ["ETL / ELT", "Data Transformation", "Data Validation", "SQL", "Dataform", "GCP"],
        },
        {
          role: "Data Engineer — AI Engineer",
          org: "บริษัท Greenline Synergy จำกัด",
          period: "พนักงานประจำ · ธ.ค. 2025 – ปัจจุบัน",
          summary:
            "ในตำแหน่ง Data Engineer ที่ Greenline Synergy ผมยังทำงานเป็น AI Engineer สร้างระบบ AI ที่ไปไกลกว่าการ Prompt ธรรมดา ผมออกแบบและส่งมอบระบบ Retrieval-Augmented Generation (RAG) ที่อ้างอิงจากเอกสารและฐานความรู้จริง, Agent ที่เรียกใช้เครื่องมือและเชื่อมต่อขั้นตอนต่าง ๆ เพื่อทำงานได้เองอัตโนมัติ (รวมถึงระบบอัตโนมัติที่สร้างด้วย n8n) และ LLM ที่ Fine-tune เฉพาะทางสำหรับงานการแพทย์ เช่น ช่วยงาน Medical Coding — โดยเน้นให้แม่นยำ เชื่อถือได้ และใช้งานได้จริงในระดับ Production",
          tags: ["RAG", "AI Agents", "n8n", "Fine-tuning", "LLM", "Vertex AI", "Vector Search"],
        },
        {
          role: "Data Scientist — โปรเจกต์วิทยานิพนธ์",
          org: "มหาวิทยาลัยวลัยลักษณ์",
          period: "2024 – 2025 (ปี 3)",
          summary:
            "โปรเจกต์จบของผม: สร้างโมเดล Machine Learning ทำนายระดับความเจ็บปวดจากสัญญาณชีวภาพ (HR, EDA, HRV, อุณหภูมิผิวหนัง) ด้วย Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM และ CatBoost โมเดลที่ดีที่สุดทำความแม่นยำได้ 83.2% ด้วย XGBoost แสดงให้เห็นว่าแนวทางนี้นำไปประยุกต์ใช้ในงานวิจัยทางการแพทย์ได้อย่างมีประสิทธิภาพ",
          tags: ["Machine Learning", "XGBoost", "Signal Processing", "Research"],
        },
        {
          role: "Air Station Data Pipeline",
          org: "โปรเจกต์ส่วนตัวด้าน Data Engineering",
          period: "กำลังดำเนินการ",
          summary:
            "Data Pipeline แบบ End-to-End ที่เก็บข้อมูลคุณภาพอากาศ (เช่น PM2.5 และค่าที่เกี่ยวข้อง) จาก API ของ OpenWeather และ Air4Thai ขั้นตอนการดึง ทำความสะอาด และแปลงข้อมูล จัดการด้วย Apache Airflow ในรูปแบบ DAG ที่ตั้งเวลาทำงานทุกวัน และจัดเก็บผลลัพธ์ที่ประมวลผลแล้วใน Supabase เพื่อให้ข้อมูลคงที่ พร้อมสืบค้น และพร้อมสำหรับการวิเคราะห์และทำ Visualization",
          tags: ["Apache Airflow", "Supabase", "OpenWeather", "Air4Thai", "ETL", "Python"],
        },
        {
          role: "Web Developer",
          org: "โปรเจกต์ส่วนตัว",
          period: "กำลังดำเนินการ",
          summary:
            "ออกแบบและสร้างเว็บโปรเจกต์ส่วนตัว (รวมถึง Portfolio นี้) ด้วย Next.js และ React เพื่อฝึกฝนทักษะ Front-end และ Full-stack ให้แข็งแกร่งขึ้น",
          tags: ["Next.js", "React", "Tailwind CSS"],
        },
      ],
    },
    education: {
      eyebrow: "04 / การศึกษา",
      title: "การศึกษา",
      items: [
        {
          degree: "วท.บ. นวัตกรรมสารสนเทศการแพทย์",
          school: "มหาวิทยาลัยวลัยลักษณ์",
          period: "2021 – 2025",
          detail:
            "สำเร็จการศึกษาปี 2025 ศึกษาจุดบรรจบของการแพทย์ ข้อมูล และซอฟต์แวร์ — ครอบคลุมทั้ง Data Science, Data Engineering และระบบสารสนเทศทางการแพทย์",
        },
      ],
    },
    contact: {
      eyebrow: "05 / ติดต่อ",
      title: "มาเชื่อมต่อกัน",
      intro:
        "มีโปรเจกต์ โอกาสในการทำงาน หรืออยากทักมาทักทาย? ผมยินดีรับฟังเสมอครับ",
      emailFormalLabel: "อีเมล (ทางการ)",
      emailPersonalLabel: "อีเมล (ส่วนตัว)",
      locationLabel: "ที่อยู่",
      location: "หาดใหญ่, ประเทศไทย",
      findMeLabel: "ช่องทางติดตาม",
    },
    experienceDetail: {
      eyebrow: "ประสบการณ์",
      title: "ประสบการณ์แบบละเอียด",
      descriptionLabel: "รายละเอียด",
      toolsLabel: "เครื่องมือ",
      linksLabel: "ลิงก์",
      items: {
        "Data Engineer @ Greenline Synergy": {
          org: "บริษัท Greenline Synergy จำกัด · ฝึกงาน (เม.ย.–ธ.ค. 2025) → พนักงานประจำ (ธ.ค. 2025 – ปัจจุบัน)",
          paragraphs: [
            "ผมเริ่มที่ Greenline Synergy ในฐานะนักศึกษาฝึกงานด้าน Data Engineering ก่อนได้รับการบรรจุเป็น Data Engineer เต็มเวลา หน้าที่หลักของผมคือพัฒนาและดูแลระบบ Data Pipeline สำหรับข้อมูลทางการเงินและข้อมูลสุขภาพขนาดใหญ่ให้กับโรงพยาบาล",
            "งานประจำวันคือออกแบบกระบวนการ ETL/ELT ที่ดึงข้อมูลจากระบบต้นทางหลายแหล่ง แปลงให้เป็นชุดข้อมูลที่สะอาดและมีโครงสร้างที่ดี และทำ Data Modeling เพื่อรองรับการวิเคราะห์ปลายทาง โดยใช้ SQL และ Dataform บน Google Cloud Platform เป็นหลัก เพื่อให้การแปลงข้อมูลเป็นโมดูล จัดเวอร์ชันได้ และทดสอบได้",
            "อีกส่วนที่สำคัญคือการทำ Data Validation — เขียน checks และ assertions เพื่อรับประกันว่าข้อมูลถูกต้อง สม่ำเสมอ และเชื่อถือได้ก่อนส่งต่อไปยังรายงานและงานวิเคราะห์ เพราะเป็นข้อมูลทางการเงินและทางคลินิกที่ความผิดพลาดมีต้นทุนสูง",
          ],
        },
        "AI Engineer @ Greenline Synergy": {
          org: "บริษัท Greenline Synergy จำกัด · พนักงานประจำ · ธ.ค. 2025 – ปัจจุบัน",
          paragraphs: [
            "ในตำแหน่งเดียวกันที่ Greenline Synergy ผมยังทำงานเป็น AI Engineer สร้างระบบ AI ที่ไปไกลกว่าการ Prompt ธรรมดา และออกแบบมาให้ทำงานได้จริงอย่างเสถียรในระดับ Production",
            "ผมออกแบบและส่งมอบระบบ Retrieval-Augmented Generation (RAG) ที่อ้างอิงจากเอกสารและฐานความรู้จริงของบริษัท เพื่อให้คำตอบมาจากแหล่งข้อมูลจริงไม่ใช่การเดาของโมเดล รวมถึงสร้าง Agent แบบ multi-tool / workflow ที่เรียกใช้ฟังก์ชันและเชื่อมต่อขั้นตอนต่าง ๆ เพื่อทำงานได้เองอัตโนมัติ — รวมถึงระบบอัตโนมัติที่สร้างด้วย n8n",
            "นอกจากนี้ผมยัง Fine-tune LLM เฉพาะทางสำหรับงานการแพทย์ เช่น ช่วยทีม Medical Coding ในการเข้ารหัสข้อมูล โดยทุกอย่างเน้นที่ความแม่นยำ ความน่าเชื่อถือ และการใช้งานได้จริง — เป็น AI ที่ช่วยทีมงานได้จริง ไม่ใช่แค่เดโม",
          ],
        },
        "Data Scientist — Thesis Project": {
          org: "มหาวิทยาลัยวลัยลักษณ์ · 2024 – 2025",
          paragraphs: [
            "โปรเจกต์จบของผมคือการใช้ Machine Learning ทำนายระดับความเจ็บปวดจากสัญญาณชีวภาพ (Physiological Signal) ได้แก่ อัตราการเต้นของหัวใจ (HR), ความต้านไฟฟ้าที่ผิวหนัง (EDA), อัตราการแปรผันของการเต้นของหัวใจ (HRV) และอุณหภูมิผิวหนัง (ST)",
            "ผมเทรนและเปรียบเทียบหลายโมเดล — Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM และ CatBoost — เพื่อหาแนวทางที่แม่นยำที่สุด โมเดลที่ดีที่สุดทำความแม่นยำได้ 83.2% ด้วย XGBoost เป็นผลลัพธ์ที่น่าพอใจและแสดงให้เห็นว่าวิธีนี้นำไปประยุกต์ใช้ในงานวิจัยทางการแพทย์ได้อย่างมีประสิทธิภาพ",
          ],
        },
      },
    },
    footer: {
      builtWith: "สร้างด้วย Next.js & Tailwind CSS",
    },
    socials,
  },
};

export default content;
