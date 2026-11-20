import { Plane, ArrowRight, Clock, Star, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FavoriteButton } from "@/components/FavoriteButton";
import ProviderGrid from "@/components/search/ProviderGrid";
import { flightProviders } from "@/lib/partnerLinks";

const mockFlights = [
  { id: 1, airline: "Iberia", from: "MAD", to: "BCN", price: 49, duration: "1h 15m", rating: 4.5, stops: 0 },
  { id: 2, airline: "Ryanair", from: "MAD", to: "LIS", price: 35, duration: "1h 10m", rating: 4.0, stops: 0 },
  { id: 3, airline: "Vueling", from: "BCN", to: "ROM", price: 79, duration: "2h 05m", rating: 4.3, stops: 0 },
  { id: 4, airline: "Air France", from: "MAD", to: "PAR", price: 120, duration: "2h 10m", rating: 4.7, stops: 0 },
  { id: 5, airline: "Turkish Airlines", from: "BCN", to: "IST", price: 159, duration: "3h 30m", rating: 4.6, stops: 0 },
  { id: 6, airline: "Emirates", from: "MAD", to: "DXB", price: 399, duration: "7h 15m", rating: 4.9, stops: 0 },
];

const Flights = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Plane className="text-blue-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Vuelos</h1>
      </div>
      <p className="text-muted-foreground mb-8">Compara precios reales en vivo con nuestros proveedores</p>

      <ProviderGrid
        title="Compara precios reales ahora"
        subtitle="Cada botón abre la búsqueda en vivo del proveedor con tu destino — precios y disponibilidad reales del mercado"
        providers={flightProviders}
      />

      <div className="flex items-center gap-2 mt-12 mb-4">
        <h2 className="text-lg font-display font-bold text-foreground">Ejemplos de rutas populares</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/60 text-muted-foreground">demo</span>
      </div>

      <div className="space-y-4">
        {mockFlights.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:neon-border transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Plane className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{f.airline}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" /> {f.rating}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground font-display font-semibold">
              <span className="text-lg">{f.from}</span>
              <ArrowRight size={16} className="text-primary" />
              <span className="text-lg">{f.to}</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={14} /> {f.duration} · {f.stops === 0 ? "Directo" : `${f.stops} escala(s)`}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-display font-bold text-primary">{f.price}€</span>
              <FavoriteButton item={{ id: `flight-${f.id}`, title: `Vuelo ${f.from} - ${f.to}`, type: "flight", price: f.price, rating: f.rating }} />
              <Button size="sm" className="neon-glow">Seleccionar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Flights;
