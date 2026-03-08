import { Hotel, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PLACEHOLDER = "/placeholder.svg";

const mockStays = [
  { id: 1, name: "Hotel Arts Barcelona", location: "Barcelona, España", price: 180, rating: 4.8, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop", type: "Hotel" },
  { id: 2, name: "Riad Marrakesch", location: "Marrakech, Marruecos", price: 95, rating: 4.6, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&auto=format&fit=crop", type: "Riad" },
  { id: 3, name: "Hostel One Prague", location: "Praga, Rep. Checa", price: 25, rating: 4.5, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop", type: "Hostel" },
  { id: 4, name: "Eco Lodge Bali", location: "Ubud, Indonesia", price: 65, rating: 4.9, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop", type: "Lodge" },
  { id: 5, name: "Apartamento Alfama", location: "Lisboa, Portugal", price: 110, rating: 4.7, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&auto=format&fit=crop", type: "Apartamento" },
  { id: 6, name: "Capsule Hotel Tokyo", location: "Tokio, Japón", price: 40, rating: 4.4, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop", type: "Cápsula" },
];

const Stays = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Hotel className="text-amber-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Alojamiento</h1>
      </div>
      <p className="text-muted-foreground mb-8">Hoteles, hostels, apartamentos y experiencias únicas</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStays.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl overflow-hidden group hover:neon-border transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">{s.type}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-foreground mb-1">{s.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin size={13} /> {s.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-foreground">{s.rating}</span>
                </div>
                <span className="text-primary font-display font-bold">{s.price}€<span className="text-xs text-muted-foreground font-normal">/noche</span></span>
              </div>
              <Button className="w-full mt-4 neon-glow" size="sm">Reservar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Stays;
