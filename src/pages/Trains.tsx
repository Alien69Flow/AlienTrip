import { TrainFront, ArrowRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockTrains = [
  { id: 1, operator: "Renfe AVE", from: "Madrid", to: "Barcelona", price: 45, duration: "2h 30m", rating: 4.5, type: "Alta velocidad" },
  { id: 2, operator: "Eurostar", from: "París", to: "Londres", price: 79, duration: "2h 16m", rating: 4.6, type: "Alta velocidad" },
  { id: 3, operator: "FlixBus", from: "Berlín", to: "Praga", price: 19, duration: "4h 30m", rating: 4.1, type: "Bus" },
  { id: 4, operator: "Trenitalia", from: "Roma", to: "Florencia", price: 29, duration: "1h 32m", rating: 4.4, type: "Frecciarossa" },
  { id: 5, operator: "SNCF TGV", from: "París", to: "Marsella", price: 39, duration: "3h 15m", rating: 4.5, type: "Alta velocidad" },
  { id: 6, operator: "Ouigo", from: "Madrid", to: "Valencia", price: 9, duration: "1h 45m", rating: 4.2, type: "Low cost" },
];

const Trains = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <TrainFront className="text-sky-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Trenes y buses</h1>
      </div>
      <p className="text-muted-foreground mb-8">Viaja por tierra al mejor precio por toda Europa</p>

      <div className="space-y-4">
        {mockTrains.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:neon-border transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                <TrainFront className="text-sky-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{t.operator}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" /> {t.rating}
                  <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300">{t.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground font-display font-semibold">
              <span className="text-lg">{t.from}</span>
              <ArrowRight size={16} className="text-primary" />
              <span className="text-lg">{t.to}</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={14} /> {t.duration}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-display font-bold text-primary">{t.price}€</span>
              <Button size="sm" className="neon-glow">Seleccionar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Trains;
