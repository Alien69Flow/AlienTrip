import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const suggestions = [
  "Quiero ir a Bali 2 semanas con 2000€ de presupuesto",
  "Viaje familiar a Japón en primavera",
  "Ruta coliving por Europa 3 meses como nómada digital",
  "Weekend romántico en algún sitio sorprendente",
];

const AiPlanner = () => {
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="text-primary" size={16} />
            <span className="text-sm font-medium text-foreground">Powered by AI Tor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Planifica con <span className="neon-text">IA</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Dile a AI Tor tu idea de viaje y generará un itinerario completo con vuelos, alojamiento, actividades y presupuesto
          </p>
        </div>

        {/* Chat area */}
        <div className="glass rounded-2xl p-6 mb-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Bot size={48} className="mx-auto text-primary/40 mb-4" />
            <p className="text-muted-foreground text-sm">
              Empieza describiendo tu viaje ideal...
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="px-3 py-2 rounded-xl glass glass-hover text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="glass neon-border rounded-2xl p-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe tu viaje ideal..."
            className="flex-1 px-4 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          <Button className="neon-glow px-6" disabled={!input.trim()}>
            <Send size={16} className="mr-1.5" />
            Enviar
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-4">
          La funcionalidad completa de AI Tor se activará con Lovable Cloud
        </p>
      </div>
    </div>
  );
};

export default AiPlanner;
