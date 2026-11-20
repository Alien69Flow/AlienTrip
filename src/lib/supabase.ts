import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Null-safe client: when the connection data is missing the app still runs,
// with data persistence disabled instead of crashing on startup.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

const SESSION_KEY = "alientrip_session_id";

export const getSessionId = (): string => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

export const ensureSession = async (): Promise<string> => {
  const id = getSessionId();
  if (!supabase) return id;
  const { error } = await supabase
    .from("aitor_sessions")
    .upsert({ id }, { ignoreDuplicates: true });
  if (error) throw error;
  return id;
};
