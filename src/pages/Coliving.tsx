import { Home, Wifi, Users, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockColivings = [
  { id: 1, name: "Outsite Lisbon", location: "Lisboa, Portugal", price: 850, rating: 4.8, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format", amenities: ["WiFi", "Coworking", "Comunidad"], minStay: "1 mes" },
  { id: 2, name: "Selina Tulum", location: "Tulum, México", price: 1200, rating: 4.7, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format", amenities: ["Piscina", "Yoga", "Coworking"], minStay: "2 semanas" },
  { id: 3, name: "Sun & Co Jávea", location: "Jávea, España", price: 700, rating: 4.9, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format", amenities: ["WiFi", "Eventos", "Playa"], minStay: "1 semana" },
  { id: 4, name: "Dojo Bali", location: "Canggu, Indonesia", price: 600, rating: 4.6, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format", amenities: ["Coworking", "Surf", "Comunidad"], minStay: "2 semanas" },
];

const Coliving = () => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Home className="text-green-400" size={28} />
        <h1 className="text-3xl font-display font-bold text-foreground">Coliving</h1>
      </div>
      <p className="text-muted-foreground mb-8">Vive, trabaja y conecta con comunidades globales</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockColivings.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl overflow-hidden group hover:neon-border transition-all"
          >
            <div className="md:flex">
              <div className="relative md:w-1/2 h-48 md:h-auto overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg">{c.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin size={13} /> {c.location}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{c.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.amenities.map((a) => (
                      <span key={a} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{a}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Estancia mín: {c.minStay}</p>
                </div>
                <div className="mt-4">
                  <span className="text-primary font-display font-bold text-xl">{c.price}€<span className="text-xs text-muted-foreground font-normal">/mes</span></span>
                  <Button className="w-full mt-3 neon-glow" size="sm">Ver espacio</Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Coliving;
