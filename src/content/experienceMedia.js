// Language-agnostic media for each role on /Experience: photos, tool tags and
// external links. Keys match t.experienceDetail.items (en + th), which supply
// the org line and description paragraphs.
import CompetitionContest from "@/assets/CompetitionContest.jpg";
import ProcedureOfDemostration from "@/assets/ProcedureOfDemostration.webp";
import VibeInContest from "@/assets/VibeInContest.jpg";
import GLS_Logo2 from "@/assets/GLS_Logo2.jpg";
import GLS_Vibe from "@/assets/GLS_Vibe.jpg";
import BDI_Logo from "@/assets/BDI_Logo.webp";

const experienceMedia = {
  // Current role at BDI: logo only for now (still ramping up).
  "Data Engineer @ BDI": {
    pictures: [BDI_Logo],
  },
  "Data Engineer @ Greenline Synergy": {
    tools: ["SQL", "Google Cloud Platform", "Dataform", "BigQuery"],
    pictures: [GLS_Logo2, GLS_Vibe],
  },
  "AI Engineer @ Greenline Synergy": {
    tools: [
      "RAG",
      "AI Agents",
      "n8n",
      "Fine-tuning",
      "LLM",
      "Vertex AI",
      "Vector Search",
    ],
  },
  "Data Scientist — Thesis Project": {
    tools: [
      "pandas",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "Matplotlib",
      "Seaborn",
      "PyTorch",
    ],
    links: {
      I_NewGen:
        "https://www.wu.ac.th/index.php/th/news/25143/index.html?utm_source=chatgpt.com",
      Medium:
        "https://medium.com/@kaiza941/%E0%B8%AD%E0%B8%B8%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B9%87%E0%B8%9A%E0%B8%9B%E0%B8%A7%E0%B8%94-728d043f6af1",
    },
    pictures: [VibeInContest, CompetitionContest, ProcedureOfDemostration],
  },
};

export default experienceMedia;
