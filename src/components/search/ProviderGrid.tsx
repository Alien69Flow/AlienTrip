import { useSearchParams } from "react-router-dom";
import { ExternalLink, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { SearchCriteria } from "@/lib/partnerLinks";
import { useI18n } from "@/lib/i18n";

type Props = {
  kind?: "compare" | "book";
  title?: string;
  subtitle?: string;
  providers: { id: string; name: string; color: string; build: (c: SearchCriteria) => string }[];
};

// Grid of real provider deep-links; every button opens the provider's own
// live search with the user's criteria prefilled.
const ProviderGrid = ({ kind = "compare", title, subtitle, providers }: Props) => {
  const { t } = useI18n();
  const resolvedTitle = title ?? t(kind === "book" ? "providers.book" : "providers.compare");
  const resolvedSub = subtitle ?? t(kind === "book" ? "providers.book.sub" : "providers.compare.sub");
  const [searchParams] = useSearchParams();
  const criteria: SearchCriteria = {
    destination: searchParams.get("destination") || "",
    dates: searchParams.get("dates") || "",
    travelers: searchParams.get("travelers") || "",
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-1">
        <Zap size={16} className="text-primary" />
        <h2 className="text-lg font-display font-bold text-foreground">{resolvedTitle}</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{resolvedSub}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {providers.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.build(criteria)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group glass rounded-xl p-4 flex items-center justify-between gap-2 hover:neon-border transition-all"
            style={{ borderColor: `${p.color}40` }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: p.color }}
              >
                {p.name.charAt(0)}
              </span>
              <span className="text-sm font-medium text-foreground truncate">{p.name}</span>
            </div>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ProviderGrid;
