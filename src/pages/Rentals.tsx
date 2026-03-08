import { Car, Fuel, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockRentals = [
  { id: 1, name: "Seat León", type: "Coche", price: 35, rating: 4.5, fuel: "Gasolina", seats: 5, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format" },
  { id: 2, name: "Tesla Model 3", type: "Eléctrico", price: 65, rating: 4.9, fuel: "Eléctrico", seats: 5, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&auto=format" },
  { id: 3, name: "Vespa 125", type: "Moto", price: 20, rating: 4.3, fuel: "Gasolina", seats: 2, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&auto=format" },
  { id: 4, name: "VW California", type: "Camper", price: 89, rating: 4.8, fuel: "Diésel", seats: 4, image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&auto=format" },
  { id: 5, name: "Bicicleta City", type: "Bici", price: 8, rating: 4.2, fuel: "—", seats: 1, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format" },
  { id: 6, name: "BMW Serie 3", type: "Coche", price: 55, rating: 4.6, fuel: "Gasolina", seats: 5, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&auto=format" },
];

const Rentals = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Car className="text-purple-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Alquileres</h1>
      </div>
      <p className="text-muted-foreground mb-8">Coches, motos, bicicletas y campers para tu aventura</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRentals.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl overflow-hidden group hover:neon-border transition-all"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">{r.type}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-foreground mb-2">{r.name}</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Fuel size={12} /> {r.fuel}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {r.seats}</span>
                <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /> {r.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary font-display font-bold text-lg">{r.price}€<span className="text-xs text-muted-foreground font-normal">/día</span></span>
                <Button size="sm" className="neon-glow">Reservar</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Rentals;
