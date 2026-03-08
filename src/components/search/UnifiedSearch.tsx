import { useState } from "react";
import {
  Search, MapPin, Calendar, Users, Bot, Bus, Car, Compass,
  Home, Hotel, Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Todo", icon: Search },
  { id: "activities", label: "Actividades", icon: Compass },
  { id: "stays", label: "Alojamiento", icon: Hotel },
  { id: "rentals", label: "Alquileres", icon: Car },
  { id: "coliving", label: "Coliving", icon: Home },
  { id: "esim", label: "eSIM", icon: Smartphone },
  { id: "packages", label: "Paquetes", icon: Package },
  { id: "restaurants", label: "Restaurantes", icon: UtensilsCrossed },
  { id: "insurance", label: "Seguros", icon: Shield },
  { id: "transfers", label: "Transfers", icon: Bus },
  { id: "trains", label: "Trenes", icon: TrainFront },
  { id: "flights", label: "Vuelos", icon: Plane },
];

const UnifiedSearch = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Category tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground neon-glow"
                : "glass glass-hover text-muted-foreground"
            }`}
          >
            <cat.icon size={15} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="glass neon-border rounded-2xl p-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <div className="md:col-span-4 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              type="text"
              placeholder="¿A dónde vas?"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-transparent focus:border-primary/30 focus:bg-white/[0.08] outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>
          <div className="md:col-span-3 relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              type="text"
              placeholder="¿Cuándo?"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-transparent focus:border-primary/30 focus:bg-white/[0.08] outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>
          <div className="md:col-span-3 relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              type="text"
              placeholder="Viajeros"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-transparent focus:border-primary/30 focus:bg-white/[0.08] outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full h-full min-h-[50px] rounded-xl neon-glow text-base font-semibold">
              <Search size={18} className="mr-1.5" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSearch;
