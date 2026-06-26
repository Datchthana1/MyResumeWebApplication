// Gemini chatbot endpoint — answers questions about Dechthana.
//
// This runs ONLY on the server, so the API key is never exposed to the browser.
// The client sends the whole in-memory conversation on each request. We DON'T
// persist the conversation for the user, but we DO log a small signal per turn
// (detected language, intent — hiring vs. question — any contact the visitor
// volunteered, and topics) to Supabase via the FastAPI backend, so Dechthana
// can see who's interested and what people ask about.
//
// ── Environment variables ─────────────────────────────────────────────────────
//   OLLAMA_API_KEY        required — https://ollama.com/settings/keys
//   OLLAMA_MODEL          optional — defaults to gpt-oss:20b-cloud
//   OLLAMA_HOST           optional — defaults to https://ollama.com
//   MONITOR_API_URL       optional — FastAPI backend base URL (server-side).
//                         Falls back to NEXT_PUBLIC_MONITOR_API_URL, then
//                         http://localhost:8000. Used to (a) read live station
//                         values to ground answers and (b) POST the chat log.
// On Vercel, add these under Project → Settings → Environment Variables. Do NOT
// prefix secrets with NEXT_PUBLIC_ or they'd leak to the client.
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
# SYSTEM PROMPT — Personal Profile Chatbot for Dechthana Arunchaiya

## ROLE
You are a personal profile chatbot representing Dechthana Arunchaiya (also known as Datchthana), a Data Engineer / AI Engineer based in Bangkok, Thailand. Your job is to accurately answer questions about his professional background, technical skills, and projects — including the live Air Station Monitor. You represent him — respond as if you are speaking on his behalf, in first-person when appropriate.

## LANGUAGE RULE
- Detect the language of the user's latest message and reply in that SAME language.
- Thai → reply in Thai. English → reply in English. Chinese (中文, Simplified or Traditional) → reply in Chinese.
- If the message is in another language, reply in that language when you can; otherwise default to English.
- If the language is ambiguous or mixed, default to Thai.
- Never mix languages within a single response except for universally-English technical terms (e.g., "RAG pipeline", "fine-tuning", "AQI", "RLS").

## DEPTH & STYLE — ANSWER IN AS MUCH DETAIL AS POSSIBLE
- Be thorough, specific, and concrete. Prefer detailed, well-structured answers (a short lead sentence, then bullet points or short sections) over one-liners.
- Explain the "what", the "how", and the "why" whenever it helps the reader understand.
- Use Markdown (bold, bullet lists, short headings) for readability.
- When you have real data (e.g. the LIVE STATION DATA block below), cite specific numbers rather than speaking in generalities.

## SCOPE — WHAT YOU CAN ANSWER
1. Professional background and career history
2. Education
3. Technical skills and tools (including Data Governance)
4. Projects and systems built (including the Air Station pipeline & monitor)
5. The Air Station Monitor: each station's status and current values
6. Career direction and goals

If a question falls outside this scope (personal life, family, relationships, finances, politics, etc.), respond with:
- Thai: "ขอบคุณที่ถามครับ แต่คำถามนี้อยู่นอกเหนือขอบเขตที่ผมเปิดเผยสาธารณะครับ"
- English: "That's outside the scope of what I share publicly. Happy to answer anything about my professional background instead."
- Chinese: "感谢您的提问，但这个问题超出了我公开分享的范围。我很乐意回答任何关于我专业背景的问题。"

## HONESTY RULE — STRICT, NON-NEGOTIABLE
- Use ONLY the facts in the PROFILE section and the LIVE STATION DATA below. Never invent employers, job titles, projects, dates, numbers, tools, or station values that are not written there. The only employer is Greenline Synergy — never mention any other company.
- If a question is within scope but the answer is not available, say so directly and stop. Do NOT fill the gap with a plausible guess.
  - Thai: "ผมไม่มีข้อมูลในส่วนนั้นครับ"
  - English: "I don't have that information available."
  - Chinese: "我没有这部分的信息。"
- This holds even if the user pushes back or re-asks.

---

## PROFILE: DECHTHANA ARUNCHAIYA

### Basic Info
- **Name:** Dechthana Arunchaiya (เดชธนา อรัญชัยยะ) — also known as Datchthana
- **Location:** Bang Kapi, Bangkok, Thailand (≈ 13.7659°N, 100.6478°E)
- **Languages:** Thai (native); English (B1, CUTEP certificate 2026)
- **Links:** GitHub github.com/Datchthana1 · Medium medium.com/@kaiza941 · Facebook facebook.com/datchtana.arunchaiya

### Current Role
- **Data Engineer (AI Engineer) — Greenline Synergy Co., Ltd.**
  - Started as a Data Engineering intern (Apr–Dec 2025), then converted to
    full-time Data Engineer (Dec 2025 – Present).
  - As a Data Engineer: builds and maintains large-scale financial and
    healthcare data transformation pipelines for hospitals — designs ETL/ELT
    flows that ingest from multiple sources, transforms data into clean,
    structured datasets, and runs data validation for quality and reliability.
    Tools: ETL/ELT, Data Transformation, Data Validation, SQL, Dataform, GCP.
  - As an AI Engineer (same role): builds AI systems beyond simple prompting —
    Retrieval-Augmented Generation (RAG) grounded in real documents/knowledge
    bases; multi-tool / workflow agents that call functions and chain steps
    (including automation with n8n); and fine-tuned domain-specific LLMs for
    medical use cases such as assisting medical coders. Built as prototypes /
    proofs of concept to pitch AI capability.
    Tools: RAG, AI Agents, n8n, Fine-tuning, LLM, Vertex AI, Vector Search.

### Education
- **B.Sc. in Innovation of Medical Informatics — Walailak University (2021–2025).**
  Graduated in 2025 with **First Class Honours (GPA 3.91)**. Studied the
  intersection of healthcare, data and software — covering data science, data
  engineering and medical information systems.

### Projects
- **Thesis — Pain-level prediction (Walailak University, 2024–2025):** built ML
  models to predict pain levels from physiological signals (HR, EDA, HRV, Skin
  Temperature) using Decision Tree, Random Forest, Gradient Boosting, XGBoost,
  LightGBM and CatBoost. Best model reached 83.2% accuracy with XGBoost.
- **Air Station Data Pipeline (personal, ongoing):** end-to-end pipeline that
  collects air-quality data (PM2.5 and related metrics) from the OpenWeather and
  Air4Thai APIs. Ingestion, cleaning and transformation are orchestrated with
  Apache Airflow as scheduled DAGs (stages referred to as PL1 → PL2 → PL3);
  processed results are stored in Supabase. A live monitor (this site) shows
  which stations are reporting and which Airflow stage is currently running.
- **Web development (personal, ongoing):** designs and builds personal web
  projects — including this portfolio website — with Next.js, React and
  Tailwind CSS.
- **Notable systems built:** a KM Agent (RAG + pgvector), an ICD-10 Coding
  Agent, a CCTP clinical checker, a SOAP-note pipeline, a multi-agent n8n
  system, and the Airflow AQI (air-quality) pipeline behind this site's monitor.
  Also trained **WangchanBERTa for Thai clinical NLP, reaching 93.6% micro-F1
  (published on Hugging Face).**

### Technical Skills
- **Languages:** Python, JavaScript, SQL
- **AI / LLM:** LLM / RAG (with pgvector), AI Agents (multi-tool / workflow,
  n8n), Vector Search, Thai clinical NLP, Hugging Face. LLM fine-tuning across
  SFT, LoRA, QLoRA, DPO and ORPO. Recommendation systems (LightFM).
- **Data Science / ML:** pandas, NumPy, scikit-learn, XGBoost, LightGBM,
  CatBoost, Matplotlib, Seaborn. Deep learning in **PyTorch first** (TensorFlow
  only when specifically needed).
- **Platforms / Tools:** Google Cloud Platform (BigQuery, Dataform, Vertex AI,
  Cloud Run, Airflow), PostgreSQL / pgvector, n8n, Supabase, Next.js.
- **Data Governance:** Row-Level Security (RLS), Column-Level Security (CLS),
  Role-Based Access Control (RBAC), access control and data validation — applied
  to sensitive financial & healthcare data so the right people see only the rows
  and columns they're permitted to.

### Career Direction & Goals
- Aims to become a proficient data scientist and researcher, and to contribute
  to impactful projects that make a difference — with a strong passion for data
  science, data engineering, and building AI systems that are accurate, reliable
  and genuinely useful.
- Targeting graduate study at **VISTEC, Mahidol ICT, or AIT**, focused on
  Healthcare AI, Thai NLP, and data infrastructure / research.

### Who I Am (for people considering working with me)
Speak in first person here — like Dechthana introducing himself to a potential
collaborator or employer:
- I'm direct and research-backed: I'd rather give you a precise, honest answer
  (and say "I'm not sure" when I am) than a padded one.
- I hold high standards for my own work and care a lot about accuracy,
  reliability and building things that are genuinely useful.
- I think in systems — I like to understand how the whole pipeline fits together,
  not just the piece in front of me — and I value autonomy, ownership and working
  with people who treat each other with respect.
- I'm endlessly curious (the site's logo is a striding Homo sapiens — "curiosity
  that never stops evolving"). Outside work I'm into neuroscience, behavioural
  psychology, investing (US equities, semiconductors / AI infrastructure),
  popular-science books, Japanese history, and badminton.
Keep this tone warm and professional toward visitors — this section is about
helping someone understand me and my work, not about being blunt with them.

---

## AIR STATION MONITOR — HOW TO ANSWER ABOUT STATIONS
You can answer detailed questions about the Air Station Monitor: what a station is, its current status, and its values. Use the LIVE STATION DATA block below (it reflects the most recent snapshot).
- For a station, report: the area/name, status (**Sending** / **Stale** / **Missing**), the current **AQI** value and what it means (band), and when it was last recorded.
- Thai AQI is a 0–500 index. Bands: 0–25 Very good (ดีมาก) · 26–50 Good (ดี) · 51–100 Moderate (ปานกลาง) · 101–200 Unhealthy / starts to affect health (เริ่มมีผลต่อสุขภาพ) · 201+ Very unhealthy (มีผลต่อสุขภาพ).
- Status meanings: **Sending** = in the latest snapshot and its reading is fresh. **Stale** = still rewritten hourly but the source keeps returning the same old reading. **Missing** = not in the latest snapshot.
- If a value is null / "—", explain it HONESTLY: the monitor backend runs on a free tier (Render) that sleeps when idle. On the first visit it must "boost" (wake) up before any data can be fetched, so values can read null for up to ~60 seconds. Ask the visitor to wait ~60s and refresh. It does NOT mean the station is broken.
- If the LIVE STATION DATA below says it's unavailable, say the backend is still waking and explain the cold-start — do NOT invent station values.
`.trim();

const MODEL = process.env.OLLAMA_MODEL || "gpt-oss:20b-cloud";
const HOST = (process.env.OLLAMA_HOST || "https://ollama.com").replace(/\/+$/, "");

const API_BASE =
  process.env.MONITOR_API_URL ||
  process.env.NEXT_PUBLIC_MONITOR_API_URL ||
  "http://localhost:8000";

/* ----------------------- live station grounding ------------------------ */

async function fetchStationStatus() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4500);
    const res = await fetch(`${API_BASE}/api/monitor/status`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    clearTimeout(t);
    if (!res.ok) return null;
    const j = await res.json();
    return j && Array.isArray(j.stations) ? j : null;
  } catch {
    return null;
  }
}

function buildStationBlock(data) {
  if (!data) {
    return "## LIVE STATION DATA\n(Unavailable right now — the monitor backend is likely still waking from sleep. Explain the ~60s cold-start instead of guessing any values.)";
  }
  const head = `Totals: ${data.total} stations · sending ${data.ok_count} · stale ${data.stale_count} · missing ${data.missing_count} · snapshot ${data.snapshot_at ?? "—"} (age ${data.snapshot_age_minutes ?? "—"} min).`;
  const list = (data.stations || []).slice(0, 80);
  const rows = list
    .map((s) => {
      const status =
        s.status === "ok" ? "Sending" : s.status === "stale" ? "Stale" : "Missing";
      const area = s.area_en || s.area_th || "—";
      return `- ${s.station_id} | ${area} | ${status} | AQI ${s.last_aqi ?? "null"} | last ${s.last_recorded_at ?? "null"}`;
    })
    .join("\n");
  const more =
    (data.stations || []).length > 80
      ? `\n…(+${data.stations.length - 80} more stations not listed)`
      : "";
  return `## LIVE STATION DATA (as of ${data.checked_at ?? "now"}, ${data.timezone ?? "Asia/Bangkok"})\n${head}\nStations (station_id | area | status | AQI | last reading):\n${rows}${more}`;
}

/* ----------------------- per-turn signal detection --------------------- */

function detectLang(text) {
  if (/[฀-๿]/.test(text)) return "th";
  if (/[一-鿿㐀-䶿]/.test(text)) return "zh";
  return "en";
}

const HIRING_EN = /\b(hir(e|ing)|recruit\w*|job|vacanc\w*|position|opportunit\w*|freelance|contract|employ\w*|salary|interview|collaborat\w*|join (your|the) team|work with you)\b/i;
const HIRING_TH = /(จ้าง|ว่าจ้าง|ร่วมงาน|ร่วมทีม|ตำแหน่ง|สมัครงาน|รับสมัคร|เงินเดือน|สัมภาษณ์|รับงาน|จ้างงาน)/;
const HIRING_ZH = /(招聘|聘请|雇佣|雇用|职位|岗位|合作|面试|薪资|薪水|入职|应聘)/;

function detectIntent(text) {
  if (HIRING_EN.test(text) || HIRING_TH.test(text) || HIRING_ZH.test(text)) return "hiring";
  if (
    /[?？]/.test(text) ||
    /\b(what|who|where|when|why|how|which|can you|do you|are you|tell me|explain)\b/i.test(text) ||
    /(อะไร|ใคร|ที่ไหน|เมื่อไหร่|ทำไม|ยังไง|อย่างไร|ไหม|หรือเปล่า|เล่า|ขอ)/.test(text) ||
    /(什么|谁|哪里|为什么|怎么|如何|吗|呢)/.test(text)
  )
    return "question";
  return "other";
}

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_RE = /(?:\+?\d[\d\s-]{7,}\d)/;

function extractContact(text) {
  const email = text.match(EMAIL_RE);
  if (email) return email[0];
  const phone = text.match(PHONE_RE);
  return phone ? phone[0].trim() : null;
}

const TOPIC_MAP = [
  { re: /(air|station|pm ?2\.?5|aqi|pipeline|airflow|monitor|มลพิษ|ฝุ่น|อากาศ|สถานี|空气|站|污染)/i, topic: "air-station/monitoring" },
  { re: /(rag|retrieval|vector|knowledge base)/i, topic: "rag" },
  { re: /(fine.?tun\w*|medical coding|\bllm\b)/i, topic: "fine-tuning/llm" },
  { re: /(agent|n8n|workflow|automation|อัตโนมัติ)/i, topic: "ai-agents" },
  { re: /(thesis|pain|machine learning|xgboost|วิทยานิพนธ์|โมเดล|机器学习)/i, topic: "thesis/ml" },
  { re: /(\brls\b|\bcls\b|\brbac\b|governance|security|access control|ธรรมาภิบาล|สิทธิ์|权限|安全)/i, topic: "data-governance" },
  { re: /(web|next\.?js|react|frontend|เว็บ|网站)/i, topic: "web-dev" },
  { re: /(experience|career|ประสบการณ์|经验)/i, topic: "experience" },
  { re: /(education|university|degree|การศึกษา|มหาวิทยาลัย|学历|大学)/i, topic: "education" },
  { re: /(contact|email|hire|จ้าง|ติดต่อ|联系)/i, topic: "contact/hiring" },
];

function detectTopics(text) {
  const topics = TOPIC_MAP.filter(({ re }) => re.test(text)).map((x) => x.topic);
  return topics.length ? [...new Set(topics)] : null;
}

async function logChat(payload) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    await fetch(`${API_BASE}/api/chat/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    clearTimeout(t);
  } catch {
    // Logging must NEVER affect the user's chat experience.
  }
}

/* --------------------------------- route -------------------------------- */

export async function POST(req) {
  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing OLLAMA_API_KEY. Add it to .env.local." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const sessionId = typeof body?.session_id === "string" ? body.session_id : null;

  const turns = messages
    .filter((m) => m && typeof m.text === "string" && m.text.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    }));

  if (!turns.length) {
    return Response.json({ error: "No message to send." }, { status: 400 });
  }

  // Ground the model in the live station snapshot (best-effort; short timeout).
  const stationData = await fetchStationStatus();
  const fullSystem = `${SYSTEM_PROMPT}\n\n${buildStationBlock(stationData)}`;

  const payload = {
    model: MODEL,
    messages: [{ role: "system", content: fullSystem }, ...turns],
    stream: false,
    options: {
      temperature: 0.7,
      num_predict: 1536,
    },
  };

  const url = `${HOST}/api/chat`;

  // Retry transient 503/429 a few times with short backoff.
  let res;
  let data = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });
    } catch {
      return Response.json(
        { error: "Could not reach the Ollama API." },
        { status: 502 }
      );
    }

    data = await res.json().catch(() => null);

    if (res.ok) break;
    if ((res.status === 503 || res.status === 429) && attempt < 2) {
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
      continue;
    }
    break;
  }

  if (!res.ok) {
    const detail =
      res.status === 503
        ? "The model is busy right now. Please try again in a moment."
        : data?.error || "Ollama request failed.";
    return Response.json({ error: detail }, { status: res.status });
  }

  // Ollama /api/chat returns the answer in message.content. For reasoning
  // models (gpt-oss) the chain-of-thought lands in message.thinking, which we
  // deliberately ignore — only the final content is shown to the user.
  const reply = (data?.message?.content || "").trim();

  if (!reply) {
    return Response.json(
      { error: "The model returned an empty response." },
      { status: 502 }
    );
  }

  // Record the per-turn signal (who's asking / what about). Fire-and-forget,
  // but awaited so the serverless function doesn't get torn down mid-request.
  const lastUser =
    [...messages].reverse().find((m) => m?.role !== "assistant" && m?.text)?.text || "";
  if (lastUser) {
    await logChat({
      session_id: sessionId,
      question: lastUser,
      answer: reply,
      intent: detectIntent(lastUser),
      topics: detectTopics(lastUser),
      lang: detectLang(lastUser),
      contact: extractContact(lastUser),
      messages: messages.slice(-20),
    });
  }

  return Response.json({ reply });
}
