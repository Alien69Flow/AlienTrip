import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type AitorMessage = {
  role: "user" | "assistant";
  content: string;
};

// Aitor IA (Ai Tor, alienflow.space) — edge function with SSE streaming.
// The endpoint is public: it accepts any apikey and streams an OpenAI-style
// SSE response. Anon key is filled from the environment when available.
const env = import.meta.env;
const projectRef = typeof env.VITE_SUPABASE_URL === "string"
  ? env.VITE_SUPABASE_URL.replace("https://", "").split(".")[0]
  : "";
const AITOR_URL = `https://wkdtvrxavkhbifjtvvdw.supabase.co/functions/v1/chat`;
// Public publishable key used by the Ai Tor web app (aitor.alienflow.space).
const AITOR_API_KEY = "sb_publishable_c4VVYw8uPzt7-24KvOre6A_91csa5Xp";

export const isAitorConfigured = Boolean(AITOR_URL);

// Streams Aitor's reply token by token into onChunk; resolves with the full text.
export const streamAitorChat = async (
  history: AitorMessage[],
  onChunk: (text: string) => void,
): Promise<string> => {
  const res = await fetch(AITOR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: AITOR_API_KEY },
    body: JSON.stringify({
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Aitor no está disponible (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta) {
          full += delta;
          onChunk(delta);
        }
      } catch {
        // partial SSE line, skip
      }
    }
  }

  return full;
};

// Persists a chat turn so history survives reloads (aitor_sessions/aitor_messages).
export const persistAitorTurn = async (
  sessionId: string | null,
  role: AitorMessage["role"],
  content: string,
): Promise<string | null> => {
  if (!isSupabaseConfigured || !supabase) return null;
  let sid = sessionId;
  if (!sid) {
    const { data, error } = await supabase
      .from("aitor_sessions")
      .insert({})
      .select("id")
      .single();
    if (error || !data) {
      console.error(error);
      return null;
    }
    sid = data.id;
  }
  const { error: msgError } = await supabase
    .from("aitor_messages")
    .insert({ session_id: sid, role, content });
  if (msgError) console.error(msgError);
  return sid;
};

void projectRef;
