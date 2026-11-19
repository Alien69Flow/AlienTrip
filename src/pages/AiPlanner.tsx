import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "¿Qué puedo visitar en Barcelona en 3 días?",
  "Planifica un viaje a Tokio con presupuesto de 2000€",
  "¿Dónde puedo hacer surf en México?",
  "Ideas de actividades para una familia en Lisboa",
];

// Simple rule-based reply engine; the conversations are stored in the
// aitor_sessions / aitor_messages tables so history survives reloads.
const buildReply = (question: string, turns: number): string => {
  const q = question.toLowerCase();
  if (q.includes("tokio") || q.includes("tokyo")) {
    return "Tokio mezcla tradición y futuro: templos en Asakusa, el cruce de Shibuya, el santuario de Meiji y el mercado de Tsukiji. Con 2000€ puedes cubrir vuelo, un hotel sencillo y comidas por 6-7 días si reservas con antelación.";
  }
  if (q.includes("barcelona")) {
    return "En 3 días en Barcelona: día 1 Sagrada Familia y Gótico, día 2 Park Güell, Gràcia y la Barceloneta, día 3 Montjuïc y el born para tapas. Compra las entradas de los monumentos online para evitar colas.";
  }
  if (q.includes("surf") || q.includes("méxico") || q.includes("mexico")) {
    return "Para surf en México, los clásicos son Puerto Escondido (olas potentes), Sayulita (ideal para aprender) y Zicatela para nivel avanzado. La mejor temporada va de abril a octubre.";
  }
  if (q.includes("lisboa") || q.includes("familia")) {
    return "En Lisboa con familia: tranvía 28, Oceanário, Torre de Belém con pasteles de Belém, y el Jardín Zoológico. La ciudad es cuesta arriba, así que combina transportes públicos con paradas en parque.";
  }
  if (q.includes("presupuesto") || q.includes("barato") || q.includes("económico")) {
    return "Para ajustar presupuesto: vuela en martes o miércoles, reserva alojamiento con cocina, come en mercados locales y mueve el centro de gravedad a barrios fuera del casco histórico. Ahorrarás un 30-40% fácilmente.";
  }
  if (q.includes("hola") || q.includes("buenas")) {
    return "¡Hola! Soy Aitor, tu asistente de viajes. Dime un destino, fechas o el tipo de plan que te apetece y te preparo ideas.";
  }
  if (turns > 2) {
    return "Cuéntame un destino concreto (ciudad o país) y si tienes fechas aproximadas, y te armo una propuesta con actividades, dónde dormir y presupuesto orientativo.";
  }
  return "Buena pregunta. Dime destino y fechas aproximadas y te propongo itinerario, dónde alojarte y qué presupuesto estimar. También puedo orientarte entre vuelos, trenes, coliving o eSIM.";
};

const AiPlanner = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Aitor, el asistente de AlienTrip. Cuéntame a dónde quieres ir, con quién y cuándo, y te ayudo a planearlo.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const ensureSession = async (): Promise<string | null> => {
    if (sessionId) return sessionId;
    const { data, error } = await supabase
      .from("aitor_sessions")
      .insert({})
      .select("id")
      .single();
    if (error || !data) {
      console.error(error);
      return null;
    }
    setSessionId(data.id);
    return data.id;
  };

  const persistMessage = (sid: string, role: Message["role"], content: string) => {
    supabase
      .from("aitor_messages")
      .insert({ session_id: sid, role, content })
      .then(({ error }) => {
        if (error) console.error(error);
      });
  };

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    const sid = await ensureSession();
    if (sid) persistMessage(sid, "user", question);

    const userTurns = messages.filter((m) => m.role === "user").length + 1;
    const reply = buildReply(question, userTurns);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (sid) persistMessage(sid, "assistant", reply);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-3">
            <Sparkles className="text-primary" size={16} />
            <span className="text-sm font-medium text-foreground">AI Planner</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
            Habla con <span className="neon-text">Aitor</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Tu asistente de viajes: itinerarios, ideas y presupuesto
          </p>
        </div>

        <Card className="glass border-none flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-secondary text-muted-foreground"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {msg.role === "user" ? <User size={15} /> : <Bot size={15} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary/60 text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Bot size={15} />
                </div>
                <div className="bg-secondary/60 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </CardContent>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta sobre tu próximo viaje..."
                className="bg-background/50 flex-1"
              />
              <Button type="submit" size="icon" className="neon-glow shrink-0" disabled={loading || !input.trim()}>
                <Send size={16} />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AiPlanner;
