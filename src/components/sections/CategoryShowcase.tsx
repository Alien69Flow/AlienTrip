import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const categories = [
  { to: "/activities", icon: Compass, desc: "Tours y experiencias locales", iconColor: "text-rose-400" },
  { to: "/ai-planner", icon: Bot, desc: "Planifica con inteligencia artificial", iconColor: "text-primary", isNew: true },
  { to: "/stays", icon: Hotel, desc: "Hoteles, hostels y apartamentos", iconColor: "text-amber-400" },
  { to: "/rentals", icon: Car, desc: "Coches, motos y bicicletas", iconColor: "text-purple-400" },
  { to: "/coliving", icon: Home, desc: "Vive con comunidades globales", iconColor: "text-green-400" },
  { to: "/esim", icon: Smartphone, desc: "Conectividad instantánea", iconColor: "text-teal-400", isNew: true },
  { to: "/packages", icon: Package, desc: "Vuelo + hotel combinados", iconColor: "text-violet-400" },
  { to: "/restaurants", icon: UtensilsCrossed, desc: "Gastronomía en cada destino", iconColor: "text-orange-400", isNew: true },
  { to: "/insurance", icon: Shield, desc: "Viaja siempre protegido", iconColor: "text-emerald-400", isNew: true },
  { to: "/transfers", icon: Bus, desc: "Traslados aeropuerto-ciudad", iconColor: "text-indigo-400", isNew: true },
  { to: "/trains", icon: TrainFront, desc: "Trenes y buses por Europa", iconColor: "text-sky-400", isNew: true },
  { to: "/flights", icon: Plane, desc: "Compara cientos de aerolíneas", iconColor: "text-blue-400" },
];

const CategoryShowcase = () => {
  const { t } = useI18n();
  const catKey = (to: string) =>
    `nav.${to === "/ai-planner" ? "aiPlanner" : to.slice(1)}`;

  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2 text-center">
          {t("categories.title")}
        </h2>
        <p className="text-sm text-muted-foreground mb-12 text-center max-w-lg mx-auto">
          {t("categories.subtitle")}
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
                  {t(catKey(cat.to))}
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
