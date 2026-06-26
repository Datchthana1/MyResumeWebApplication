-- ===========================================================================
-- Supabase table for the AI chatbot's visitor log.
-- Run this ONCE in the Supabase SQL Editor.
--
-- The Next.js /api/chat route detects, per turn, the visitor's language, a
-- best-effort intent (hiring vs. a plain question), any contact they
-- volunteered, and the topics they asked about. It POSTs that to the FastAPI
-- backend (/api/chat/log), which inserts a row here. This is how "who wants to
-- hire me / who asked what" gets recorded.
--
-- transcript/topics are stored as JSONB so the whole conversation and the
-- topic list stay queryable.
-- ===========================================================================

create table if not exists public.chat_logs (
  id          bigint generated always as identity primary key,
  session_id  text,
  question    text,
  answer      text,
  intent      text,          -- 'hiring' | 'question' | 'other'
  topics      jsonb,         -- e.g. ["air pipeline","rag","monitoring"]
  lang        text,          -- 'th' | 'en' | 'zh' | ...
  contact     text,          -- email/phone the visitor shared, if any
  transcript  jsonb,         -- full message array for the turn (optional)
  user_agent  text,
  created_at  text default to_char(now() at time zone 'Asia/Bangkok', 'YYYY-MM-DD HH24:MI:SS')
);

-- Helpful for triage: newest first, and quick filtering of hiring leads.
create index if not exists chat_logs_created_at_idx on public.chat_logs (created_at desc);
create index if not exists chat_logs_intent_idx     on public.chat_logs (intent);

-- The backend uses the service-role (or anon) key. Inserts happen server-side
-- only; no browser ever talks to this table directly. If you keep RLS ON,
-- the service-role key bypasses it. To allow the anon key to insert, add a
-- policy like the commented one below.
alter table public.chat_logs enable row level security;

-- create policy "server inserts only" on public.chat_logs
--   for insert to anon, service_role with check (true);
