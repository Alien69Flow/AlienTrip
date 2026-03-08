import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Menu, Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed, X, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainLinks = [
  { to: "/activities", label: "Actividades", icon: Compass },
  { to: "/stays", label: "Alojamiento", icon: Hotel },
  { to: "/coliving", label: "Coliving", icon: Home },
  { to: "/packages", label: "Paquetes", icon: Package },
  { to: "/flights", label: "Vuelos", icon: Plane },
  { to: "/ai-planner", label: "AI Planner", icon: Bot },
];

const moreLinks = [
  { to: "/rentals", label: "Alquileres", icon: Car },
  { to: "/esim", label: "eSIM", icon: Smartphone },
  { to: "/restaurants", label: "Restaurantes", icon: UtensilsCrossed },
  { to: "/insurance", label: "Seguros", icon: Shield },
  { to: "/transfers", label: "Transfers", icon: Bus },
  { to: "/trains", label: "Trenes", icon: TrainFront },
];

const allLinks = [...mainLinks, ...moreLinks].sort((a, b) => a.label.localeCompare(b.label));

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-display font-bold neon-text">👽 AlienTrip</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary neon-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
              >
                Más <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-white/[0.08] p-2 z-50 animate-fade-in">
                    {moreLinks.map((link) => {
                      const active = location.pathname === link.to;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                          }`}
                        >
                          <link.icon size={16} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Iniciar sesión
            </Button>
            <Button size="sm" className="neon-glow">Registrarse</Button>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/[0.08] animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {allLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="ghost" className="w-full justify-center">Iniciar sesión</Button>
              <Button className="w-full justify-center neon-glow">Registrarse</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
