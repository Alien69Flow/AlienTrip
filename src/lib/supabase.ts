import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const { error } = await supabase
    .from("aitor_sessions")
    .upsert({ id }, { ignoreDuplicates: true });
  if (error) throw error;
  return id;
};
