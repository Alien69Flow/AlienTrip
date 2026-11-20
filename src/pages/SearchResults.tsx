import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Search, MapPin, Users, Calendar, ArrowLeft, Loader as Loader2 } from "lucide-react";
import { getProviders, CATEGORY_LABELS, type SearchCategory } from "@/lib/searchProviders";
import { supabase, getSessionId } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const VALID_CATEGORIES: SearchCategory[] = [
  "all", "flights", "stays", "cars", "trains", "esim",
  "insurance", "coliving", "activities", "restaurants", "packages", "transfers",
];

const SearchResults = () => {
  const [params] = useSearchParams();
  const destination = params.get("destination") || "";
  const dates = params.get("dates") || undefined;
  const startDate = params.get("startDate") || undefined;
  const endDate = params.get("endDate") || undefined;
  const travelers = params.get("travelers") || undefined;
  const rawCat = params.get("category") || "all";
  const category = (VALID_CATEGORIES.includes(rawCat as SearchCategory) ? rawCat : "all") as SearchCategory;

  const [saved, setSaved] = useState(false);

  const providers = getProviders(category);
  const searchParams: Parameters<typeof getProviders>[0] extends never ? never : any = {
    destination, dates, startDate, endDate, travelers, category,
  };

  useEffect(() => {
    if (!destination || saved) return;
    setSaved(true);
    supabase
      .from("searches")
      .insert({
        session_id: getSessionId(),
        category,
        destination,
        start_date: startDate || null,
        end_date: endDate || null,
        travelers: travelers ? Number(travelers) || null : null,
      })
      .then(() => {}, () => {});
  }, [destination, category, startDate, endDate, travelers, saved]);

  const openAll = () => {
    providers.forEach((p, i) => {
      window.open(p.build(searchParams), "_blank", i === 0 ? "noopener" : undefined);
    });
  };

  if (!destination) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center glass rounded-2xl p-12 max-w-md">
          <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-xl font-display font-bold text-foreground mb-2">No hay destino</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Escribe un destino en el buscador para comparar proveedores.
          </p>
          <Link to="/">
            <Button variant="secondary">Ir al buscador</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Nueva búsqueda
        </Link>

        {/* Query summary */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold">
                  {CATEGORY_LABELS[category]}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Comparando: {destination}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                {startDate && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {startDate}{endDate ? ` → ${endDate}` : ""}
                  </span>
                )}
                {!startDate && dates && (
                  <span className="flex items-center gap-1"><Calendar size={14} /> {dates}</span>
                )}
                {travelers && (
                  <span className="flex items-center gap-1"><Users size={14} /> {travelers} viajeros</span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {providers.length} proveedores
                </span>
              </div>
            </div>
            <Button onClick={openAll} className="neon-glow gap-2 shrink-0">
              <ExternalLink size={16} /> Abrir en todos
            </Button>
          </div>
        </div>

        {/* Provider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.build(searchParams)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5 hover:neon-border hover:-translate-y-0.5 transition-all group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-secondary/60 flex items-center justify-center font-display font-bold ${p.color}`}>
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 flex-1">
                Compara precios en {p.name} para {destination}
              </p>
              <span className="text-sm font-semibold text-primary flex items-center gap-1">
                Ver en {p.name} <Loader2 size={0} className="hidden" />
              </span>
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-10 max-w-md mx-auto">
          AlienTrip lanza tu búsqueda ya rellenada en cada proveedor y abre los resultados en pestañas nuevas.
          Próximamente mostraremos precios directamente aquí gracias a integraciones directas.
        </p>
      </div>
    </div>
  );
};

export default SearchResults;
