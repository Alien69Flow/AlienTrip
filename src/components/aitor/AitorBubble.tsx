import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, ExternalLink, Loader as Loader2 } from "lucide-react";
import { supabase, ensureSession } from "@/lib/supabase";
import { ECOSYSTEM } from "@/lib/ecosystem";

const AITOR_URL = "https://aitor.alienflow.space";
const INPUT_SINK = "alientrip-aitor-input-sink";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AitorBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sinkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        const sessionId = await ensureSession();
        const { data, error } = await supabase
          .from("aitor_messages")
          .select("role, content")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });
        if (cancelled) return;
        if (error) throw error;
        if (data && data.length > 0) {
          setMessages(data as Message[]);
        } else {
          setMessages([
            {
              role: "assistant",
              content:
                "Hola, soy Aitor, la IA de AlienFlowSpace. Pregúntame sobre viajes, la DAO o cualquier destino. Este chat incorporado es una versión ligera: para la experiencia completa, usa el botón de abrir Aitor.",
            },
          ]);
        }
      } catch {
        if (!cancelled) {
          setMessages([
            {
              role: "assistant",
              content: "No pude cargar el historial ahora mismo. Aún puedes escribir y abrir Aitor en su web.",
            },
          ]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Detect if Aitor's site refuses to be embedded (X-Frame-Options / CSP)
  const handleIframeLoad = () => {
    try {
      const doc = (iframeRef.current as HTMLIFrameElement | null)?.contentDocument;
      if (doc === null) return; // cross-origin and loaded fine
      if (!doc || doc.body?.childElementCount === 0) setIframeBlocked(true);
    } catch {
      // cross-origin access throws when the frame DID load
    }
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const sessionId = await ensureSession();
      const { error: insertErr } = await supabase
        .from("aitor_messages")
        .insert({ session_id: sessionId, role: "user", content: text });
      if (insertErr) throw insertErr;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `He recibido tu mensaje: "${text}". La conexión directa con el cerebro de Aitor está activándose; para una respuesta completa ahora mismo, ábreme en mi web oficial. Pronto esta ventana responderá por sí sola.`,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "No pude guardar tu mensaje. Inténtalo de nuevo o abre Aitor en su web." },
      ]);
    } finally {
      setLoading(false);
      sinkRef.current?.focus();
      document.getElementById(INPUT_SINK)?.blur();
    }
  }, [input, loading]);

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
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-background animate-pulse" />
        )}
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
                  <p className="text-[11px] text-muted-foreground mt-0.5">IA de AlienFlowSpace · en línea</p>
                </div>
              </div>
              <a
                href={AITOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Abrir Aitor en una pestaña nueva"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Embedded Aitor or fallback chat */}
            {!iframeBlocked ? (
              <div className="flex-1 relative bg-white">
                <iframe
                  ref={iframeRef}
                  src={AITOR_URL}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-0"
                  title="Aitor - IA de AlienFlowSpace"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-0">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                          : "mr-auto bg-secondary/70 text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))}
                  {loading && (
                    <div className="mr-auto bg-secondary/70 px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
                      <Loader2 size={16} className="animate-spin text-primary" />
                    </div>
                  )}
                </div>

                {/* Quick ecosystem links */}
                <div className="px-4 pb-2 flex gap-1.5 flex-wrap border-t border-border/40 pt-2">
                  {ECOSYSTEM.projects.slice(0, 4).map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                    >
                      {p.name}
                    </a>
                  ))}
                </div>

                {/* Input */}
                <div className="p-3 border-t border-border/50 bg-background/60 backdrop-blur-xl">
                  <div className="flex gap-2">
                    <input
                      ref={sinkRef}
                      id={INPUT_SINK}
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AitorBubble;
