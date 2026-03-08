import { Shield, Heart, Plane, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockInsurance = [
  { id: 1, provider: "SafetyWing", plan: "Nomad Insurance", coverage: "Médico + Viaje", price: 42, perMonth: true, rating: 4.6, highlight: "Popular nómadas" },
  { id: 2, provider: "IATI Seguros", plan: "IATI Estrella", coverage: "Todo riesgo", price: 89, perMonth: false, rating: 4.7, highlight: "Cobertura premium" },
  { id: 3, provider: "World Nomads", plan: "Standard", coverage: "Médico + Aventura", price: 65, perMonth: false, rating: 4.4, highlight: "Deportes extremos" },
  { id: 4, provider: "Heymondo", plan: "Viaje Tranquilidad", coverage: "Médico + Cancelación", price: 55, perMonth: false, rating: 4.5, highlight: "Cancelación gratis" },
  { id: 5, provider: "SafetyWing", plan: "Remote Health", coverage: "Salud completa", price: 73, perMonth: true, rating: 4.3, highlight: "Salud global" },
  { id: 6, provider: "Chapka", plan: "Cap Aventure", coverage: "Multiactividad", price: 48, perMonth: false, rating: 4.2, highlight: "Mochileros" },
];

const Insurance = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="text-emerald-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Seguros de viaje</h1>
      </div>
      <p className="text-muted-foreground mb-8">Viaja protegido con los mejores seguros comparados</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockInsurance.map((ins, i) => (
          <motion.div
            key={ins.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 hover:neon-border transition-all flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">{ins.highlight}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star size={12} className="text-yellow-400 fill-yellow-400" /> {ins.rating}
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">{ins.provider}</p>
              <p className="text-sm text-muted-foreground">{ins.plan}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart size={14} className="text-emerald-400" /> {ins.coverage}
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="text-xl font-display font-bold text-primary">
                {ins.price}€<span className="text-xs text-muted-foreground font-normal">/{ins.perMonth ? "mes" : "viaje"}</span>
              </span>
              <Button size="sm" className="neon-glow">Contratar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Insurance;
