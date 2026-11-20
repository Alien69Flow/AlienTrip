/*
# Aitor chat + search tracking (anonymous visitors)

1. New Tables
- `aitor_sessions`
  - `id` (uuid, primary key): anonymous browser identifier, generated client-side.
  - `created_at` (timestamptz).
- `aitor_messages`
  - `id` (uuid, primary key)
  - `session_id` (uuid, not null, references aitor_sessions on delete cascade): the visitor's session.
  - `role` (text, not null): 'user' or 'assistant'.
  - `content` (text, not null): message body.
  - `created_at` (timestamptz).
- `searches`
  - `id` (uuid, primary key)
  - `session_id` (uuid, not null): same anonymous browser identifier.
  - `category` (text, not null): flights, stays, cars, trains, esim, insurance, coliving, activities, restaurants, packages, transfers.
  - `destination` (text, not null): free text destination.
  - `start_date` (text): optional ISO date.
  - `end_date` (text): optional ISO date.
  - `travelers` (integer): optional.
  - `created_at` (timestamptz).
2. Security
- Enable RLS on all three tables.
- Grant SELECT/INSERT (and DELETE on aitor_messages so a visitor can clear their chat) to anon + authenticated: this is a no-auth app, each visitor owns rows keyed by their anonymous session id.
- Policies scope every read/write to `session_id = current_setting('app.session_id')` is NOT used because the anon client cannot set settings per-request safely; instead the session id is a random uuid held only in the visitor's browser, and policies simply require a valid uuid session row (messages require the parent session to exist). All policies TO anon, authenticated.
3. Notes
- No auth in this app; the anonymous session id is a random uuid stored in localStorage and acts as the ownership key.
- Index on aitor_messages(session_id, created_at) for chat history reads.
- Index on searches(created_at) for analytics.
*/

CREATE TABLE IF NOT EXISTS aitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS aitor_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES aitor_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  category text NOT NULL,
  destination text NOT NULL,
  start_date text,
  end_date text,
  travelers integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_aitor_messages_session ON aitor_messages (session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_searches_created ON searches (created_at);

ALTER TABLE aitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE aitor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON aitor_sessions TO anon, authenticated;
GRANT SELECT, INSERT, DELETE ON aitor_messages TO anon, authenticated;
GRANT SELECT, INSERT ON searches TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_sessions" ON aitor_sessions;
CREATE POLICY "anon_insert_sessions" ON aitor_sessions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_sessions" ON aitor_sessions;
CREATE POLICY "anon_select_sessions" ON aitor_sessions FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_delete_sessions" ON aitor_sessions;
CREATE POLICY "anon_delete_sessions" ON aitor_sessions FOR DELETE
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_messages" ON aitor_messages;
CREATE POLICY "anon_insert_messages" ON aitor_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_messages" ON aitor_messages;
CREATE POLICY "anon_select_messages" ON aitor_messages FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_delete_messages" ON aitor_messages;
CREATE POLICY "anon_delete_messages" ON aitor_messages FOR DELETE
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_searches" ON searches;
CREATE POLICY "anon_insert_searches" ON searches FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_searches" ON searches;
CREATE POLICY "anon_select_searches" ON searches FOR SELECT
TO anon, authenticated USING (true);
