import { supabase } from "@/lib/supabase";

// Aitor IA (Ai Tor, alienflow.space) — edge function with SSE streaming.
const AITOR_URL = "https://wkdtvrxavkhbifjtvvdw.supabase.co/functions/v1/chat";
const AITOR_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.supabase-anon-key-placeholder";

export type AitorMessage = {
  role: "user" | "assistant";
  content: string;
};

// Streams Aitor's reply token by token into onChunk; resolves with the full text.
export const streamAitorChat = async (
  history: AitorMessage[],
  onChunk: (text: string) => void,
): Promise<string> => {
  const res = await fetch(AITOR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: AITOR_API_KEY },
    body: JSON.stringify({
      messages: history.map((m) => ({
        role: m.role,
        content: m.content,
      })),
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
  await supabase
    .from("aitor_messages")
    .insert({ session_id: sid, role, content })
    .then(({ error }) => {
      if (error) console.error(error);
    });
  return sid;
};
