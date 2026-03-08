import { Link } from "react-router-dom";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed,
} from "lucide-react";

const allLinks = [
  { to: "/activities", label: "Actividades", icon: Compass },
  { to: "/ai-planner", label: "AI Planner", icon: Bot },
  { to: "/stays", label: "Alojamiento", icon: Hotel },
  { to: "/rentals", label: "Alquileres", icon: Car },
  { to: "/coliving", label: "Coliving", icon: Home },
  { to: "/esim", label: "eSIM", icon: Smartphone },
  { to: "/packages", label: "Paquetes", icon: Package },
  { to: "/restaurants", label: "Restaurantes", icon: UtensilsCrossed },
  { to: "/insurance", label: "Seguros", icon: Shield },
  { to: "/transfers", label: "Transfers", icon: Bus },
  { to: "/trains", label: "Trenes", icon: TrainFront },
  { to: "/flights", label: "Vuelos", icon: Plane },
];

const col1 = allLinks.slice(0, 4);
const col2 = allLinks.slice(4, 8);
const col3 = allLinks.slice(8, 12);

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <span className="text-xl font-display font-bold neon-text">👽 AlienTrip</span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              La super-app definitiva para viajeros. 12 servicios en un solo lugar: vuelos, alojamiento, trenes, paquetes, coliving y mucho más.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/60">
              Powered by <span className="text-primary font-medium">AI Tor</span>
            </p>
          </div>

          {[col1, col2, col3].map((col, ci) => (
            <div key={ci}>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm">
                {ci === 0 ? "Explorar" : ci === 1 ? "Servicios" : "Más"}
              </h4>
              <ul className="space-y-2.5">
                {col.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <l.icon size={14} /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 AlienTrip. Parte del ecosistema <span className="text-primary">AlienFlow</span>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
