import { Compass, Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockActivities = [
  { id: 1, name: "Tour del Coliseo", location: "Roma, Italia", price: 45, rating: 4.8, duration: "3h", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&auto=format", category: "Cultura" },
  { id: 2, name: "Surf en Canggu", location: "Bali, Indonesia", price: 30, rating: 4.7, duration: "2h", image: "https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=400&auto=format", category: "Aventura" },
  { id: 3, name: "Clase de cocina thai", location: "Bangkok, Tailandia", price: 25, rating: 4.9, duration: "4h", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format", category: "Gastronomía" },
  { id: 4, name: "Safari al atardecer", location: "Masái Mara, Kenia", price: 120, rating: 5.0, duration: "5h", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&auto=format", category: "Naturaleza" },
  { id: 5, name: "Tour de tapas", location: "Madrid, España", price: 35, rating: 4.6, duration: "3h", image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=400&auto=format", category: "Gastronomía" },
  { id: 6, name: "Kayak en los fiordos", location: "Bergen, Noruega", price: 80, rating: 4.8, duration: "6h", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format", category: "Aventura" },
];

const Activities = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Compass className="text-rose-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Actividades</h1>
      </div>
      <p className="text-muted-foreground mb-8">Experiencias únicas, tours y aventuras en cada destino</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockActivities.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl overflow-hidden group hover:neon-border transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">{a.category}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-foreground mb-1">{a.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin size={13} /> {a.location}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock size={12} /> {a.duration}</span>
                <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /> {a.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary font-display font-bold text-lg">{a.price}€</span>
                <Button size="sm" className="neon-glow">Reservar</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Activities;
