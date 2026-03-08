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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-display font-bold neon-text tracking-tight">👽 AlienTrip</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 text-[13px] font-medium transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}

            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition-colors ${
                  moreLinks.some(l => location.pathname === l.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Más <ChevronDown size={12} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-52 bg-popover border border-border rounded-xl shadow-xl p-1.5 z-50">
                    {moreLinks.map((link) => {
                      const active = location.pathname === link.to;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                            active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          <link.icon size={15} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-[13px] h-8">
              Iniciar sesión
            </Button>
            <Button size="sm" className="neon-glow h-8 text-[13px]">Registrarse</Button>
          </div>

          <button className="lg:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            {allLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <link.icon size={17} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 flex flex-col gap-2 border-t border-border mt-2">
              <Button variant="ghost" className="w-full justify-center text-sm">Iniciar sesión</Button>
              <Button className="w-full justify-center neon-glow text-sm">Registrarse</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
