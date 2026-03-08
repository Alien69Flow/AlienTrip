import { Bus, MapPin, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockTransfers = [
  { id: 1, provider: "GetTransfer", route: "Aeropuerto BCN → Centro", type: "Privado", capacity: 3, price: 39, duration: "25 min", rating: 4.5 },
  { id: 2, provider: "Shuttle Direct", route: "Aeropuerto MAD → Centro", type: "Compartido", capacity: 8, price: 12, duration: "35 min", rating: 4.2 },
  { id: 3, provider: "Welcome Pickups", route: "Aeropuerto FCO → Roma Centro", type: "Privado", capacity: 4, price: 48, duration: "40 min", rating: 4.7 },
  { id: 4, provider: "Blacklane", route: "Aeropuerto CDG → París", type: "Premium", capacity: 3, price: 79, duration: "45 min", rating: 4.8 },
  { id: 5, provider: "GetTransfer", route: "Aeropuerto LIS → Centro", type: "Privado", capacity: 4, price: 25, duration: "20 min", rating: 4.4 },
  { id: 6, provider: "KiwiTaxi", route: "Aeropuerto AMS → Centro", type: "Compartido", capacity: 6, price: 15, duration: "30 min", rating: 4.3 },
];

const Transfers = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Bus className="text-indigo-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Transfers</h1>
      </div>
      <p className="text-muted-foreground mb-8">Traslados aeropuerto-ciudad sin complicaciones</p>

      <div className="space-y-4">
        {mockTransfers.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:neon-border transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Bus className="text-indigo-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{t.provider}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" /> {t.rating}
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 ml-1">{t.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin size={14} className="text-primary" /> {t.route}
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock size={14} /> {t.duration}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {t.capacity} pax</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-display font-bold text-primary">{t.price}€</span>
              <Button size="sm" className="neon-glow">Reservar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Transfers;
