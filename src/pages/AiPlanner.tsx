import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { streamAitorChat, persistAitorTurn, type AitorMessage } from "@/lib/aitor";

const suggestions = [
  "¿Qué puedo visitar en Barcelona en 3 días?",
  "Planifica un viaje a Tokio con presupuesto de 2000€",
  "¿Dónde puedo hacer surf en México?",
  "Ideas de actividades para una familia en Lisboa",
];

const AiPlanner = () => {
  const [messages, setMessages] = useState<AitorMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    const history: AitorMessage[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    sessionIdRef.current = await persistAitorTurn(
      sessionIdRef.current,
      "user",
      question
    );

    try {
      await streamAitorChat(history, (chunk) => {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      });
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Lo siento, no he podido conectar con Aitor en este momento. Inténtalo de nuevo en unos segundos.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
      const finalMsgs = history;
      const reply = finalMsgs[finalMsgs.length - 1];
      // reply content is streamed above; persist once complete using latest state
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last.content) {
          persistAitorTurn(sessionIdRef.current, "assistant", last.content).then(
            (sid) => {
              sessionIdRef.current = sid;
            }
          );
        }
        return prev;
      });
      void reply;
    }
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
            Tu asistente de viajes con IA en tiempo real: itinerarios, ideas y presupuesto
          </p>
        </div>

        <Card className="glass border-none flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  Pregunta lo que quieras sobre tu próximo viaje
                </p>
              </div>
            )}
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
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary/60 text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.content || (loading && i === messages.length - 1 ? "…" : msg.content)}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </CardContent>

          {messages.length === 0 && (
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
              <Button
                type="submit"
                size="icon"
                className="neon-glow shrink-0"
                disabled={loading || !input.trim()}
              >
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
