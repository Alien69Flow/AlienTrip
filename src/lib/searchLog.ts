import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Best-effort analytics log: never blocks or breaks the search flow.
export const logSearch = (search: {
  category: string;
  destination: string;
  dates: string;
  travelers: string;
}) => {
  if (!isSupabaseConfigured || !supabase) return;
  (async () => {
    const { error } = await supabase.from("searches").insert({
      category: search.category,
      destination: search.destination || null,
      start_date: search.dates || null,
      travelers: search.travelers ? Number(search.travelers) : null,
    });
    if (error) console.error(error);
  })();
};
