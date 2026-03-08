import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format",
    rating: 4.9,
    price: "Desde 899€",
    tag: "🔥 Trending",
    flag: "🇮🇩",
  },
  {
    id: "tokyo",
    name: "Tokio, Japón",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format",
    rating: 4.8,
    price: "Desde 1.199€",
    tag: "⭐ Popular",
    flag: "🇯🇵",
  },
  {
    id: "lisbon",
    name: "Lisboa, Portugal",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&auto=format",
    rating: 4.7,
    price: "Desde 399€",
    tag: "💰 Oferta",
    flag: "🇵🇹",
  },
  {
    id: "tulum",
    name: "Tulum, México",
    image: "https://images.unsplash.com/photo-1682553064729-84ab0dec7cf4?w=600&auto=format",
    rating: 4.8,
    price: "Desde 749€",
    tag: "🏖️ Coliving",
    flag: "🇲🇽",
  },
  {
    id: "dubai",
    name: "Dubai, EAU",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format",
    rating: 4.9,
    price: "Desde 999€",
    tag: "✨ Premium",
    flag: "🇦🇪",
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format",
    rating: 4.7,
    price: "Desde 349€",
    tag: "🎨 Cultura",
    flag: "🇪🇸",
  },
];

const TrendingDestinations = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-primary" size={24} />
          <h2 className="text-3xl font-display font-bold text-foreground">
            Destinos Trending
          </h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Los destinos más buscados por nuestra comunidad de viajeros
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass rounded-2xl overflow-hidden cursor-pointer hover:neon-border transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">
                    {dest.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3 text-2xl">{dest.flag}</div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  {dest.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    <span className="text-sm text-foreground font-medium">{dest.rating}</span>
                  </div>
                  <span className="text-primary font-semibold text-sm">{dest.price}</span>
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
