import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed,
} from "lucide-react";

const categories = [
  { to: "/activities", icon: Compass, title: "Actividades", desc: "Tours y experiencias locales", iconColor: "text-rose-400" },
  { to: "/ai-planner", icon: Bot, title: "AI Planner", desc: "Planifica con inteligencia artificial", iconColor: "text-primary", isNew: true },
  { to: "/stays", icon: Hotel, title: "Alojamiento", desc: "Hoteles, hostels y apartamentos", iconColor: "text-amber-400" },
  { to: "/rentals", icon: Car, title: "Alquileres", desc: "Coches, motos y bicicletas", iconColor: "text-purple-400" },
  { to: "/coliving", icon: Home, title: "Coliving", desc: "Vive con comunidades globales", iconColor: "text-green-400" },
  { to: "/esim", icon: Smartphone, title: "eSIM", desc: "Conectividad instantánea", iconColor: "text-teal-400", isNew: true },
  { to: "/packages", icon: Package, title: "Paquetes", desc: "Vuelo + hotel combinados", iconColor: "text-violet-400" },
  { to: "/restaurants", icon: UtensilsCrossed, title: "Restaurantes", desc: "Gastronomía en cada destino", iconColor: "text-orange-400", isNew: true },
  { to: "/insurance", icon: Shield, title: "Seguros", desc: "Viaja siempre protegido", iconColor: "text-emerald-400", isNew: true },
  { to: "/transfers", icon: Bus, title: "Transfers", desc: "Traslados aeropuerto-ciudad", iconColor: "text-indigo-400", isNew: true },
  { to: "/trains", icon: TrainFront, title: "Trenes", desc: "Trenes y buses por Europa", iconColor: "text-sky-400", isNew: true },
  { to: "/flights", icon: Plane, title: "Vuelos", desc: "Compara cientos de aerolíneas", iconColor: "text-blue-400" },
];

const CategoryShowcase = () => {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2 text-center">
          Todo lo que necesitas
        </h2>
        <p className="text-sm text-muted-foreground mb-12 text-center max-w-lg mx-auto">
          12 servicios en una sola plataforma para planificar, comparar y reservar
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.to}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={cat.to}
                className="block p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 group transition-all duration-300 relative"
              >
                {cat.isNew && (
                  <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/15 text-primary">
                    NEW
                  </span>
                )}
                <cat.icon
                  size={28}
                  className={`${cat.iconColor} mb-3 group-hover:scale-110 transition-transform`}
                />
                <h3 className="font-display font-semibold text-foreground text-sm mb-0.5">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
