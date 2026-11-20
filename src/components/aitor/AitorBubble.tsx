import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Loader as Loader2 } from "lucide-react";
import { supabase, ensureSession, isSupabaseConfigured } from "@/lib/supabase";
import { streamAitorChat, getLocalAitorReply, type AitorMessage } from "@/lib/aitor";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hola, soy Aitor, la IA de AlienFlowSpace. Pregúntame sobre viajes, destinos, presupuestos o la DAO.",
};

const AitorBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || historyLoaded) return;
    let cancelled = false;
    (async () => {
      try {
        if (!isSupabaseConfigured || !supabase) {
          setMessages([WELCOME]);
          setHistoryLoaded(true);
          return;
        }
        sessionIdRef.current = await ensureSession();
        const { data, error } = await supabase
          .from("aitor_messages")
          .select("role, content")
          .eq("session_id", sessionIdRef.current)
          .order("created_at", { ascending: true })
          .limit(50);
        if (cancelled) return;
        if (error) throw error;
        setMessages(data && data.length > 0 ? (data as Message[]) : [WELCOME]);
      } catch {
        if (!cancelled) setMessages([WELCOME]);
      } finally {
        if (!cancelled) setHistoryLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, historyLoaded]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    const history: AitorMessage[] = [
      ...messages.filter((m) => m.role === "user" || m.content),
      { role: "user", content: text },
    ];
    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      await streamAitorChat(history, (chunk) => {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") {
            copy[copy.length - 1] = { ...last, content: last.content + chunk };
          }
          return copy;
        });
      });
    } catch {
      // Remote brain unavailable — answer locally so the chat never dead-ends.
      const reply = getLocalAitorReply(text);
      for (const word of reply.split(" ")) {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") {
            copy[copy.length - 1] = { ...last, content: (last.content ? last.content + " " : "") + word };
          }
          return copy;
        });
        await new Promise((r) => setTimeout(r, 18));
      }
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  return (
    <>
      {/* Bubble */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full neon-glow bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label={open ? "Cerrar chat de Aitor" : "Abrir chat de Aitor"}
      >
        {open ? <X size={24} /> : <Bot size={26} />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-[60] w-[calc(100vw-2.5rem)] sm:w-[400px] h-[540px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden glass border-none shadow-2xl shadow-primary/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/60 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-display font-bold text-foreground leading-none">Aitor</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    IA de AlienFlowSpace · en línea
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col min-h-0">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                        : "mr-auto bg-secondary/70 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content ||
                      (loading && i === messages.length - 1 ? "…" : m.content)}
                  </div>
                ))}
                {loading && messages[messages.length - 1]?.content === "" && (
                  <div className="mr-auto bg-secondary/70 px-3.5 py-2.5 rounded-2xl rounded-bl-sm w-fit">
                    <Loader2 size={16} className="animate-spin text-primary" />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/50 bg-background/60 backdrop-blur-xl">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Escribe a Aitor..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-secondary/50 border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={send}
                    disabled={loading || !input.trim()}
                    className="px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:bg-primary/90 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AitorBubble;
