import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed,
} from "lucide-react";

const categories = [
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
  {
    to: "/stays",
    icon: Hotel,
    title: "Alojamiento",
    desc: "Hoteles, hostels, apartamentos y más",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
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
    to: "/coliving",
    icon: Home,
    title: "Coliving",
    desc: "Vive y trabaja con comunidades globales",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    to: "/esim",
    icon: Smartphone,
    title: "eSIM",
    desc: "Conectividad instantánea en destino",
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-400",
  },
  {
    to: "/packages",
    icon: Package,
    title: "Paquetes",
    desc: "Vuelo + hotel + actividad combinados",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
  },
  {
    to: "/restaurants",
    icon: UtensilsCrossed,
    title: "Restaurantes",
    desc: "Gastronomía local en cada destino",
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
  {
    to: "/insurance",
    icon: Shield,
    title: "Seguros",
    desc: "Viaja protegido, compara seguros",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
  },
  {
    to: "/transfers",
    icon: Bus,
    title: "Transfers",
    desc: "Traslados aeropuerto-ciudad fáciles",
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
  },
  {
    to: "/trains",
    icon: TrainFront,
    title: "Trenes",
    desc: "Trenes y buses por toda Europa",
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-400",
  },
  {
    to: "/flights",
    icon: Plane,
    title: "Vuelos",
    desc: "Compara precios en cientos de aerolíneas",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
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
          12 servicios en una sola plataforma para planificar, comparar y reservar tu viaje completo
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
