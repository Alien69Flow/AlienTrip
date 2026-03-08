import { Link } from "react-router-dom";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed, Globe, Mail, Twitter, Instagram,
} from "lucide-react";

const serviceLinks = [
  { to: "/activities", label: "Actividades", icon: Compass },
  { to: "/stays", label: "Alojamiento", icon: Hotel },
  { to: "/rentals", label: "Alquileres", icon: Car },
  { to: "/coliving", label: "Coliving", icon: Home },
  { to: "/esim", label: "eSIM", icon: Smartphone },
  { to: "/packages", label: "Paquetes", icon: Package },
];

const moreServiceLinks = [
  { to: "/restaurants", label: "Restaurantes", icon: UtensilsCrossed },
  { to: "/insurance", label: "Seguros", icon: Shield },
  { to: "/transfers", label: "Transfers", icon: Bus },
  { to: "/trains", label: "Trenes", icon: TrainFront },
  { to: "/flights", label: "Vuelos", icon: Plane },
  { to: "/ai-planner", label: "AI Planner", icon: Bot },
];

const companyLinks = [
  { label: "Sobre nosotros", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contacto", href: "#" },
  { label: "Trabaja con nosotros", href: "#" },
];

const legalLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos de uso", href: "#" },
  { label: "Cookies", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-display font-bold neon-text">👽 AlienTrip</span>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              La super-app definitiva para viajeros. 12 servicios en un solo lugar.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Instagram, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services col 1 */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col 2 */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2">
              {moreServiceLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Compañía</h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            © 2026 AlienTrip · Ecosistema <span className="text-primary">AlienFlow</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            Powered by <span className="text-primary font-medium">AI Tor</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
