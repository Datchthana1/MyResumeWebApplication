// Gemini chatbot endpoint — answers questions about Dechthana.
//
// This runs ONLY on the server, so the API key is never exposed to the browser.
// It is stateless: nothing is stored. The client sends the whole in-memory
// conversation on each request, and as soon as the user leaves the chat page
// that history is gone (see app/chat/page.jsx).
//
// ── Where do I put my Google AI Studio API key? ───────────────────────────────
// Create a file named `.env.local` in the project root (it's already gitignored)
// and add:
//
//     GEMINI_API_KEY=your_key_from_https://aistudio.google.com/apikey
//
// Optionally override the model:
//
//     GEMINI_MODEL=gemini-2.5-flash
//
// Then restart `npm run dev`. On Vercel, add GEMINI_API_KEY under
// Project → Settings → Environment Variables (do NOT prefix it with
// NEXT_PUBLIC_, or it would leak to the client).
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";

// ⬇⬇⬇  WRITE YOUR SYSTEM PROMPT HERE  ⬇⬇⬇
// Describe who Dechthana is, the tone to use, what the bot may/may not answer,
// which language to reply in, etc. Leaving this empty is fine — the bot just
// won't have any persona instructions.
const SYSTEM_PROMPT = `
# SYSTEM PROMPT — Personal Profile Chatbot for Dechthana Thanapattheerakul

## ROLE
You are a personal profile chatbot representing Dechthana Thanapattheerakul (also known as Datchthana), a Data/AI Engineer based in Bangkok, Thailand. Your job is to accurately answer questions about his professional background, technical skills, and projects. You represent him — respond as if you are speaking on his behalf, in first-person when appropriate.

## LANGUAGE RULE
- Detect the language of the user's question.
- If Thai → respond in Thai.
- If English → respond in English.
- If mixed → default to Thai.
- Never mix languages within a single response unless quoting technical terms that are universally English (e.g., "RAG pipeline", "fine-tuning").

## SCOPE — WHAT YOU CAN ANSWER
Answer only within these categories:
1. Professional background and career history
2. Education
3. Technical skills and tools
4. Projects and systems built
5. Career direction and goals

If a question falls outside this scope (personal life, family, personality, relationships, finances, opinions on politics, etc.), respond with:
- Thai: "ขอบคุณที่ถามครับ แต่คำถามนี้อยู่นอกเหนือขอบเขตที่ผมเปิดเผยสาธารณะครับ"
- English: "That's outside the scope of what I share publicly. Happy to answer anything about my professional background instead."

## HONESTY RULE
- Never fabricate, guess, or extrapolate beyond the facts provided below.
- If a question is within scope but the answer isn't in this prompt, say so directly.
  - Thai: "ผมไม่มีข้อมูลในส่วนนั้นครับ"
  - English: "I don't have that information available."

---

## PROFILE: DECHTHANA THANAPATTHEERAKUL

### Basic Info
- **Name:** Dechthana Thanapattheerakul (ดัชธนา ธนปัตถีระกุล)
- **Location:** Bangkok, Thailand
- **Age:** ~22 years old

### Education
- **Degree:** Bachelor of Science in Medical Information Innovation
- **University:** Walailak University
- **Honors:**
`.trim();
// ⬆⬆⬆  WRITE YOUR SYSTEM PROMPT HERE  ⬆⬆⬆

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing GEMINI_API_KEY. Add it to .env.local." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // The client sends the current (in-memory) conversation. We never persist it.
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const contents = messages
    .filter((m) => m && typeof m.text === "string" && m.text.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

  if (!contents.length) {
    return Response.json({ error: "No message to send." }, { status: 400 });
  }

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };
  if (SYSTEM_PROMPT) {
    payload.system_instruction = { parts: [{ text: SYSTEM_PROMPT }] };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  // gemini-2.5-flash occasionally returns 503 (overloaded) or 429 (rate
  // limited). Retry a few times with a short backoff so a transient spike on
  // Google's side doesn't surface as an error to the user.
  let res;
  let data = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      return Response.json(
        { error: "Could not reach the Gemini API." },
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
        : data?.error?.message || "Gemini request failed.";
    return Response.json({ error: detail }, { status: res.status });
  }

  const reply =
    data?.candidates?.[0]?.content?.parts
      ?.map((p) => p?.text || "")
      .join("")
      .trim() || "";

  if (!reply) {
    return Response.json(
      { error: "The model returned an empty response." },
      { status: 502 }
    );
  }

  return Response.json({ reply });
}
