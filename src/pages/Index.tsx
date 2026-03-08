import { useEffect, useState } from "react";
import UnifiedSearch from "@/components/search/UnifiedSearch";
import TrustBadges from "@/components/hero/TrustBadges";
import ChromaticSmoke from "@/components/hero/ChromaticSmoke";
import TrendingDestinations from "@/components/sections/TrendingDestinations";
import CategoryShowcase from "@/components/sections/CategoryShowcase";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative min-h-[90vh] overflow-hidden flex items-center">
        <ChromaticSmoke />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-5xl mx-auto space-y-6">
            <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-foreground">
                🌍 12 servicios · Vuelos · Hoteles · Trenes · Paquetes · Coliving · eSIM y más
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground transition-all duration-700 delay-100 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Tu viaje completo,{" "}
              <span className="neon-text">un solo lugar</span>
            </h1>

            <p
              className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Combina vuelos, alojamiento, trenes, paquetes, coliving, seguros, eSIM y más.
              Planifica con IA y ahorra tiempo y dinero.
            </p>

            <div className={`transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <UnifiedSearch />
            </div>

            <div className={`transition-all duration-700 delay-[400ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <TrustBadges />
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <TrendingDestinations />
      <CategoryShowcase />
    </div>
  );
};

export default Index;
