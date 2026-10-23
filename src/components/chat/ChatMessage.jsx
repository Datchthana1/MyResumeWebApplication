"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLang } from "@/providers/LanguageProvider";

// Tailwind classes for the markdown elements the bot tends to emit (bold,
// bullet / numbered lists, links, inline code). react-markdown never renders
// raw HTML by default, so this is safe for LLM output.
const mdComponents = {
  p: (props) => <p className="mb-2 last:mb-0" {...props} />,
  ul: (props) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0" {...props} />,
  ol: (props) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: (props) => (
    <a
      className="underline underline-offset-2 hover:text-ink"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => <code className="rounded bg-line px-1 py-0.5 text-[0.85em]" {...props} />,
  h1: (props) => <h1 className="mb-2 text-base font-semibold" {...props} />,
  h2: (props) => <h2 className="mb-2 text-base font-semibold" {...props} />,
  h3: (props) => <h3 className="mb-1 font-semibold" {...props} />,
};

/* One bubble in the conversation. User text is plain; assistant text is
   rendered as markdown. */
export default function ChatMessage({ role, text }) {
  const { t } = useLang();
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser ? "whitespace-pre-wrap bg-ink text-paper" : "bg-surface-2 text-ink"
        }`}
      >
        <span className="sr-only">{isUser ? t.chat.you : t.chat.assistant}: </span>
        {isUser ? (
          text
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
