import { Link } from "react-router-dom";
import { Plane, Hotel, Compass, Home, Car, Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-display font-bold neon-text">👽 AlienTrip</span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              La super-app definitiva para viajeros. Vuelos, alojamiento, actividades, coliving y más en un solo lugar.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/60">
              Powered by <span className="text-primary font-medium">AI Tor</span>
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Explorar</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/flights", label: "Vuelos", icon: Plane },
                { to: "/stays", label: "Alojamiento", icon: Hotel },
                { to: "/activities", label: "Actividades", icon: Compass },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <l.icon size={14} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Servicios</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/coliving", label: "Coliving", icon: Home },
                { to: "/rentals", label: "Alquileres", icon: Car },
                { to: "/ai-planner", label: "AI Planner", icon: Bot },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <l.icon size={14} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Compañía</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">Sobre nosotros</span></li>
              <li><span className="text-sm text-muted-foreground">Términos</span></li>
              <li><span className="text-sm text-muted-foreground">Privacidad</span></li>
              <li><span className="text-sm text-muted-foreground">Contacto</span></li>
            </ul>
          </div>
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
