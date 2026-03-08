import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Hotel, Compass, Home, Car, Bot } from "lucide-react";

const categories = [
  {
    to: "/flights",
    icon: Plane,
    title: "Vuelos",
    desc: "Compara precios en cientos de aerolíneas",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    to: "/stays",
    icon: Hotel,
    title: "Alojamiento",
    desc: "Hoteles, hostels, apartamentos y más",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    to: "/coliving",
    icon: Home,
    title: "Coliving",
    desc: "Vive y trabaja con comunidades globales",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    to: "/rentals",
    icon: Car,
    title: "Alquileres",
    desc: "Coches, motos y bicicletas por destino",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    to: "/activities",
    icon: Compass,
    title: "Actividades",
    desc: "Experiencias únicas y tours locales",
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
  },
  {
    to: "/ai-planner",
    icon: Bot,
    title: "AI Planner",
    desc: "Planifica tu viaje completo con IA",
    gradient: "from-primary/20 to-neon-glow/20",
    iconColor: "text-primary",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2 text-center">
          Todo lo que necesitas
        </h2>
        <p className="text-muted-foreground mb-12 text-center max-w-lg mx-auto">
          Una sola plataforma para planificar, comparar y reservar tu viaje completo
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={cat.to}
                className={`block p-6 rounded-2xl glass glass-hover group transition-all duration-300 hover:neon-border bg-gradient-to-br ${cat.gradient}`}
              >
                <cat.icon
                  size={32}
                  className={`${cat.iconColor} mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
