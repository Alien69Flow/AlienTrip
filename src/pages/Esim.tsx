import { Smartphone, Wifi, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockEsims = [
  { id: 1, provider: "Holafly", region: "Europa", data: "Ilimitados", days: 15, price: 34, rating: 4.6 },
  { id: 2, provider: "Airalo", region: "Asia", data: "10 GB", days: 30, price: 26, rating: 4.4 },
  { id: 3, provider: "Nomad eSIM", region: "EE.UU.", data: "5 GB", days: 7, price: 12, rating: 4.3 },
  { id: 4, provider: "Holafly", region: "Latinoamérica", data: "Ilimitados", days: 10, price: 29, rating: 4.5 },
  { id: 5, provider: "Airalo", region: "Global", data: "3 GB", days: 30, price: 18, rating: 4.2 },
  { id: 6, provider: "Maya Mobile", region: "Japón", data: "Ilimitados", days: 14, price: 32, rating: 4.7 },
];

const Esim = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Smartphone className="text-teal-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">eSIM</h1>
      </div>
      <p className="text-muted-foreground mb-8">Conectividad instantánea en cualquier destino</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEsims.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 hover:neon-border transition-all flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <Wifi className="text-teal-400" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{e.provider}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> {e.rating}
                  </div>
                </div>
              </div>
              <span className="text-xl font-display font-bold text-primary">{e.price}€</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe size={14} /> {e.region} · {e.data} · {e.days} días
            </div>
            <Button size="sm" className="neon-glow w-full mt-auto">Comprar eSIM</Button>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Esim;
