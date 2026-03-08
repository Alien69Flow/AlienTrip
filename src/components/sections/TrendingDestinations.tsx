import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, TrendingUp, ArrowRight } from "lucide-react";

const PLACEHOLDER = "/placeholder.svg";

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop",
    rating: 4.9,
    price: "Desde 899€",
    tag: "🔥 Trending",
    flag: "🇮🇩",
  },
  {
    id: "tokyo",
    name: "Tokio, Japón",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop",
    rating: 4.8,
    price: "Desde 1.199€",
    tag: "⭐ Popular",
    flag: "🇯🇵",
  },
  {
    id: "lisbon",
    name: "Lisboa, Portugal",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&auto=format&fit=crop",
    rating: 4.7,
    price: "Desde 399€",
    tag: "💰 Oferta",
    flag: "🇵🇹",
  },
  {
    id: "tulum",
    name: "Tulum, México",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&auto=format&fit=crop",
    rating: 4.8,
    price: "Desde 749€",
    tag: "🏖️ Coliving",
    flag: "🇲🇽",
  },
  {
    id: "dubai",
    name: "Dubai, EAU",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop",
    rating: 4.9,
    price: "Desde 999€",
    tag: "✨ Premium",
    flag: "🇦🇪",
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop",
    rating: 4.7,
    price: "Desde 349€",
    tag: "🎨 Cultura",
    flag: "🇪🇸",
  },
];

const TrendingDestinations = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="text-primary" size={20} />
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Destinos Trending
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Los destinos más buscados por nuestra comunidad
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/activities?destination=${encodeURIComponent(dest.name)}`)}
              className="group rounded-2xl overflow-hidden cursor-pointer bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 backdrop-blur-sm text-foreground">
                    {dest.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3 text-xl">{dest.flag}</div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {dest.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={13} />
                    <span className="text-xs text-foreground font-medium">{dest.rating}</span>
                  </div>
                  <span className="text-primary font-bold text-sm">{dest.price}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorar <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;
