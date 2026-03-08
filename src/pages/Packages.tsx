import { Package, Plane, Hotel, Compass, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockPackages = [
  { id: 1, title: "Roma Clásica", days: 5, includes: ["Vuelo", "Hotel 4★", "Tour Coliseo"], price: 599, originalPrice: 780, rating: 4.8, image: "🇮🇹" },
  { id: 2, title: "Bali Aventura", days: 10, includes: ["Vuelo", "Villa privada", "3 excursiones"], price: 1299, originalPrice: 1650, rating: 4.9, image: "🇮🇩" },
  { id: 3, title: "Lisboa Express", days: 3, includes: ["Vuelo", "Hostel céntrico", "Free tour"], price: 249, originalPrice: 340, rating: 4.5, image: "🇵🇹" },
  { id: 4, title: "Tokio Cultural", days: 7, includes: ["Vuelo", "Ryokan", "JR Pass"], price: 1899, originalPrice: 2400, rating: 4.7, image: "🇯🇵" },
  { id: 5, title: "Marrakech Mágica", days: 4, includes: ["Vuelo", "Riad", "Tour desierto"], price: 449, originalPrice: 590, rating: 4.6, image: "🇲🇦" },
  { id: 6, title: "NYC Weekend", days: 4, includes: ["Vuelo", "Hotel Manhattan", "Broadway"], price: 899, originalPrice: 1200, rating: 4.8, image: "🇺🇸" },
];

const Packages = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Package className="text-violet-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Paquetes</h1>
      </div>
      <p className="text-muted-foreground mb-8">Vuelo + hotel + actividades combinados al mejor precio</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPackages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl overflow-hidden hover:neon-border transition-all flex flex-col"
          >
            <div className="h-32 bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-5xl">
              {pkg.image}
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground text-lg">{pkg.title}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" /> {pkg.rating}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} /> {pkg.days} días
              </div>
              <div className="flex flex-wrap gap-1.5">
                {pkg.includes.map((inc) => (
                  <span key={inc} className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300">{inc}</span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div>
                  <span className="text-2xl font-display font-bold text-primary">{pkg.price}€</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">{pkg.originalPrice}€</span>
                </div>
                <Button size="sm" className="neon-glow">Reservar</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Packages;
