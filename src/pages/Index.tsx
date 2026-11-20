import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot } from "lucide-react";
import UnifiedSearch from "@/components/search/UnifiedSearch";
import TrustBadges from "@/components/hero/TrustBadges";
import ChromaticSmoke from "@/components/hero/ChromaticSmoke";
import TrendingDestinations from "@/components/sections/TrendingDestinations";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import HowItWorks from "@/components/sections/HowItWorks";
import { Button } from "@/components/ui/button";

const fadeUp = (loaded: boolean, delay: string) =>
  `transition-all duration-700 ${delay} ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative min-h-[92vh] overflow-hidden flex items-center">
        <ChromaticSmoke />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-5xl mx-auto space-y-6">
            <div className={fadeUp(loaded, "")}>
              <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-foreground">
                18 proveedores · Vuelos · Hoteles · Trenes · Actividades · Coliving · eSIM y más
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-6xl md:text-7xl font-display font-bold text-foreground tracking-tight ${fadeUp(loaded, "delay-100")}`}
            >
              Comparamos todo.
              <br />
              <span className="neon-text">Tú solo viajas.</span>
            </h1>

            <p
              className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto ${fadeUp(loaded, "delay-200")}`}
            >
              Vuelos, alojamiento, trenes, actividades y 12 servicios más — con ofertas reales
              del mercado y Aitor, tu IA de viaje, siempre a bordo.
            </p>

            <div className={fadeUp(loaded, "delay-300")}>
              <UnifiedSearch />
            </div>

            <div className={fadeUp(loaded, "delay-[400ms]")}>
              <TrustBadges />
            </div>
          </div>
        </div>
      </div>

      {/* Real market partners */}
      <PartnerMarquee />

      {/* Sections */}
      <HowItWorks />
      <TrendingDestinations />
      <CategoryShowcase />

      {/* Final CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-card p-10 sm:p-16 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Bot size={26} className="text-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-3">
              ¿No sabes dónde ir? Pregúntale a Aitor.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8">
              Dime tu presupuesto y tus ganas, y te propongo destino, itinerario y coste
              desglosado en segundos. Sin registro y gratis.
            </p>
            <Button size="lg" className="neon-glow rounded-full px-8 h-12 text-sm font-semibold gap-2" asChild>
              <Link to="/ai-planner">
                Hablar con Aitor <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
