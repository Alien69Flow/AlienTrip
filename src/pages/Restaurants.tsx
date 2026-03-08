import { UtensilsCrossed, MapPin, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockRestaurants = [
  { id: 1, name: "La Barraca", city: "Barcelona", cuisine: "Paella / Mariscos", price: "€€", rating: 4.7, reviews: 2340 },
  { id: 2, name: "Trattoria da Mario", city: "Roma", cuisine: "Italiana clásica", price: "€€", rating: 4.8, reviews: 4120 },
  { id: 3, name: "Café de Flore", city: "París", cuisine: "Francesa / Bistró", price: "€€€", rating: 4.5, reviews: 6780 },
  { id: 4, name: "Ichiran Ramen", city: "Tokio", cuisine: "Ramen japonés", price: "€", rating: 4.6, reviews: 8900 },
  { id: 5, name: "Jemaa el-Fna Food Stalls", city: "Marrakech", cuisine: "Street food marroquí", price: "€", rating: 4.4, reviews: 3200 },
  { id: 6, name: "Pastéis de Belém", city: "Lisboa", cuisine: "Pastelería portuguesa", price: "€", rating: 4.9, reviews: 12400 },
];

const Restaurants = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <UtensilsCrossed className="text-orange-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Restaurantes</h1>
      </div>
      <p className="text-muted-foreground mb-8">Descubre la mejor gastronomía local en cada destino</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRestaurants.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 hover:neon-border transition-all flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-foreground text-lg">{r.name}</h3>
              <span className="text-sm text-amber-400 font-medium">{r.price}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" /> {r.city}
            </div>
            <p className="text-sm text-muted-foreground">{r.cuisine}</p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-foreground font-medium">{r.rating}</span>
                <span>({r.reviews.toLocaleString()})</span>
              </div>
              <Button size="sm" className="neon-glow">Reservar mesa</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Restaurants;
