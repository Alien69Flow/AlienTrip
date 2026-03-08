import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, Calendar, Users, ChevronDown,
  Bot, Bus, Car, Compass, Home, Hotel, Package,
  Plane, Shield, Smartphone, TrainFront, UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Todo", icon: Search, path: "/" },
  { id: "activities", label: "Actividades", icon: Compass, path: "/activities" },
  { id: "ai-planner", label: "AI Planner", icon: Bot, path: "/ai-planner" },
  { id: "stays", label: "Alojamiento", icon: Hotel, path: "/stays" },
  { id: "rentals", label: "Alquileres", icon: Car, path: "/rentals" },
  { id: "coliving", label: "Coliving", icon: Home, path: "/coliving" },
  { id: "esim", label: "eSIM", icon: Smartphone, path: "/esim" },
  { id: "packages", label: "Paquetes", icon: Package, path: "/packages" },
  { id: "restaurants", label: "Restaurantes", icon: UtensilsCrossed, path: "/restaurants" },
  { id: "insurance", label: "Seguros", icon: Shield, path: "/insurance" },
  { id: "transfers", label: "Transfers", icon: Bus, path: "/transfers" },
  { id: "trains", label: "Trenes", icon: TrainFront, path: "/trains" },
  { id: "flights", label: "Vuelos", icon: Plane, path: "/flights" },
];

const popularDestinations = [
  { name: "Bali, Indonesia", flag: "🇮🇩" },
  { name: "Tokio, Japón", flag: "🇯🇵" },
  { name: "Barcelona, España", flag: "🇪🇸" },
  { name: "Lisboa, Portugal", flag: "🇵🇹" },
  { name: "Tulum, México", flag: "🇲🇽" },
  { name: "Dubai, EAU", flag: "🇦🇪" },
  { name: "Bangkok, Tailandia", flag: "🇹🇭" },
  { name: "Roma, Italia", flag: "🇮🇹" },
  { name: "París, Francia", flag: "🇫🇷" },
  { name: "Nueva York, EE.UU.", flag: "🇺🇸" },
];

const UnifiedSearch = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const sugRef = useRef<HTMLDivElement>(null);

  const activeCat = categories.find((c) => c.id === category) || categories[0];
  const ActiveIcon = activeCat.icon;

  const filteredDestinations = destination.length > 0
    ? popularDestinations.filter((d) => d.name.toLowerCase().includes(destination.toLowerCase()))
    : popularDestinations;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setShowCatDropdown(false);
      if (sugRef.current && !sugRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = () => {
    const cat = categories.find((c) => c.id === category);
    const path = cat?.path || "/";
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (dates) params.set("dates", dates);
    if (travelers) params.set("travelers", travelers);
    const query = params.toString();
    navigate(path === "/" && category === "all" ? `/activities${query ? `?${query}` : ""}` : `${path}${query ? `?${query}` : ""}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border p-1.5 shadow-2xl shadow-primary/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5">
          {/* Category selector */}
          <div className="md:col-span-3 relative" ref={catRef}>
            <button
              onClick={() => setShowCatDropdown(!showCatDropdown)}
              className="w-full flex items-center gap-2 px-4 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors text-sm text-foreground"
            >
              <ActiveIcon size={16} className="text-primary shrink-0" />
              <span className="truncate font-medium">{activeCat.label}</span>
              <ChevronDown size={14} className={`ml-auto text-muted-foreground transition-transform shrink-0 ${showCatDropdown ? "rotate-180" : ""}`} />
            </button>
            {showCatDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-popover border border-border rounded-xl shadow-xl max-h-64 overflow-y-auto py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategory(cat.id); setShowCatDropdown(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      category === cat.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <cat.icon size={15} />
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination with autocomplete */}
          <div className="md:col-span-3 relative" ref={sugRef}>
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
            <input
              type="text"
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="¿A dónde vas?"
              className="w-full pl-9 pr-3 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/80 focus:bg-secondary/80 border-0 outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
            />
            {showSuggestions && filteredDestinations.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-popover border border-border rounded-xl shadow-xl max-h-64 overflow-y-auto py-1">
                {filteredDestinations.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => { setDestination(d.name); setShowSuggestions(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <span>{d.flag}</span>
                    {d.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="md:col-span-3 relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
            <input
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="¿Cuándo?"
              className="w-full pl-9 pr-3 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/80 focus:bg-secondary/80 border-0 outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>

          {/* Search button */}
          <div className="md:col-span-3">
            <Button
              onClick={handleSearch}
              className="w-full h-full min-h-[50px] rounded-xl neon-glow text-sm font-semibold gap-2"
            >
              <Search size={16} />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSearch;
