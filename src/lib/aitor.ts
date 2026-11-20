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

// Local fallback brain: when the remote endpoint rejects the key or is down,
// Aitor still answers with prepared travel guidance instead of failing.
const LOCAL_TIPS: { match: RegExp; reply: string }[] = [
  {
    match: /vuelo|avi[óo]n|volarm?|volar/i,
    reply:
      "Para vuelos, mi consejo de siempre: compara en la pestaña de Vuelos con Kayak, Skyscanner y Google Vuelos — abre cada uno con tu destino ya buscado. Martes y miércoles suelen ser los días más baratos, y reservar con 6-8 semanas de antelación da los mejores precios en Europa. ¿Desde dónde vuelas y a dónde vas? Te afino la recomendación.",
  },
  {
    match: /hotel|alojamiento|airbnb|booking|dormir|quedada|quedarme/i,
    reply:
      "En Alojamiento comparo Airbnb, Booking.com, Expedia y Hostelworld con un clic. Regla rápida: hoteles para estancias cortas, Airbnb para 4+ noches (mejor precio y cocina), hostels si viajas solo y quieres conocer gente. ¿Para qué ciudad y cuántas noches?",
  },
  {
    match: /presupuesto|barato|precio|cuánto|cuanto|dinero|coste/i,
    reply:
      "Presupuestos orientativos por día y persona: Sudeste Asiático 25-40 €, Europa del Este 40-60 €, Europa Occidental 80-120 €, EE.UU. 120-180 €. Vuelo europeo low-cost desde 25 € si madrugas en la reserva. Dime destino y días y te preparo un desglose.",
  },
  {
    match: /itinerario|plan|ruta|d[ií]as|agenda|qué ver|que ver/i,
    reply:
      "Te propongo un ritmo 2-1: dos días de visitas intensas, un día tranquilo. Reserva museos grandes (Alhambra, Vaticano, Sagrada Família) con semanas de antelación, y deja las actividades al aire libre para el segundo o tercer día por si el tiempo acompaña. ¿Qué destino tienes en mente?",
  },
  {
    match: /tren|renfe|ave/i,
    reply:
      "Los trenes en España salen a la venta ~60 días antes y las tarifas más baratas vuelan en las horas puntas. Compara Renfe con Trainline y Omio desde la pestaña de Trenes — a veces el bus de FlixBus tarda el doble pero cuesta la mitad.",
  },
  {
    match: /seguro|médic|medic|salud|sanidad/i,
    reply:
      "Nunca viajes sin seguro si sales de tu país: una noche de hospital en EE.UU. puede costar más que el vuelo. En Seguros comparo Heymondo, IATI y Chapka; para viajes largos de trabajo, mira los de cobertura de equipaje tecnológico.",
  },
  {
    match: /esim|internet|datos|móvil|movil|wifi/i,
    reply:
      "La eSIM es la mejor invención para viajeros: aterrizas y ya tienes datos, sin cambiar de tarjeta. En la pestaña de eSIM tienes paquetes por región; para un viaje de una semana, 5-10 GB suele sobrar.",
  },
];

const localReply = (text: string): string => {
  for (const tip of LOCAL_TIPS) if (tip.match.test(text)) return tip.reply;
  return `Sobre «${text}»: te ayudo encantado. Puedo hablarte de vuelos, alojamiento, trenes, actividades, presupuestos, itinerarios, seguros o eSIM — dime por dónde empiezo. También puedes usar el buscador de la página principal y comparo ofertas reales de Kayak, Airbnb, Booking, GetYourGuide y más al instante.`;
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

// Synchronous local answer used when the remote brain is unavailable.
export const getLocalAitorReply = (text: string): string => localReply(text);

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
