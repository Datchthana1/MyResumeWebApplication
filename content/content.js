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
        "Data Scientist":
          "My senior thesis applied Machine Learning to predict pain levels from physiological signals — Heart Rate (HR), Electrodermal Activity (EDA), Heart Rate Variability (HRV) and Skin Temperature (ST). I trained and compared Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM and CatBoost to find the most accurate model. The best result reached 83.2% accuracy with XGBoost — a promising outcome that can be applied effectively in medical research.",
        "Data Engineer":
          "I interned at Greenline Synergy Co., Ltd. as a Data Engineer, where my main work was developing financial processing systems and large-scale data pipelines for hospitals — organizing big data from many sources into clean, analysis-ready datasets. I also took part in data validation to ensure high data quality, and built a chatbot on Google Cloud Platform to help the medical team with Medical Coding, improving efficiency and reducing data-entry errors.",
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
      lastName: "อรุณชัยยะ",
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
        "Data Scientist":
          "ผมได้ทำโปรเจกต์จบที่เกี่ยวกับการใช้ Machine Learning สำหรับการทำนายความเจ็บปวดจากสัญญาณชีวภาพ (Physiological Signal) ได้แก่ อัตราการเต้นของหัวใจ (Heart Rate: HR), ความต้านไฟฟ้าที่ผิวหนัง (Electrodermal Activity: EDA), อัตราการแปรผันของอัตราการเต้นของหัวใจ (Heart Rate Variability: HRV) และอุณหภูมิที่ผิวหนัง (Skin Temperature: ST) โดยใช้เทคนิคต่าง ๆ เช่น Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM และ CatBoost เพื่อสร้างโมเดลที่มีประสิทธิภาพสูงสุด ซึ่งโมเดลทำนายระดับความเจ็บปวดได้ที่ 83.2% ด้วย XGBoost ผลลัพธ์น่าพอใจและสามารถนำไปประยุกต์ใช้ในงานวิจัยทางการแพทย์ได้อย่างมีประสิทธิภาพ",
        "Data Engineer":
          "ผมได้ฝึกงานกับบริษัท Greenline Synergy Co., Ltd. ในตำแหน่ง Data Engineer โดยมีหน้าที่หลักในการพัฒนาระบบประมวลผลทางการเงินและระบบประมวลผลข้อมูลขนาดใหญ่ให้กับโรงพยาบาล เพื่อจัดการข้อมูลขนาดใหญ่จากแหล่งต่าง ๆ ให้เป็นระบบและพร้อมใช้งานสำหรับการวิเคราะห์ นอกจากนี้ผมยังมีส่วนร่วมในการตรวจสอบและยืนยันความถูกต้องของข้อมูล (Data Validation) เพื่อให้มั่นใจว่าข้อมูลมีคุณภาพสูง และได้พัฒนาระบบแชทบอทบน Google Cloud Platform สำหรับช่วยทีมงานทางการแพทย์ในการเข้ารหัสข้อมูลทางการแพทย์ (Medical Coding) ซึ่งช่วยเพิ่มประสิทธิภาพและลดข้อผิดพลาดในการป้อนข้อมูล",
      },
    },
    footer: {
      builtWith: "สร้างด้วย Next.js & Tailwind CSS",
    },
    socials,
  },
};

export default content;
