import { motion } from "framer-motion";
import { flightProviders, stayProviders, activityProviders, transportProviders, carRentalProviders, esimProviders, transferProviders, insuranceProviders, packageProviders } from "@/lib/partnerLinks";
import { useI18n } from "@/lib/i18n";

// Continuous marquee of real market partners — reinforces "we compare everything".
const PartnerMarquee = () => {
  const { t } = useI18n();
  const all = [...flightProviders, ...stayProviders, ...activityProviders, ...transportProviders, ...carRentalProviders, ...esimProviders, ...transferProviders, ...insuranceProviders, ...packageProviders];
  const unique = Array.from(new Map(all.map((p) => [p.id, p])).values());
  const row = [...unique, ...unique]; // duplicated for seamless loop

  return (
    <section className="py-10 border-y border-border/50 bg-card/30 overflow-hidden">
      <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">
        {t("marquee.title")}
      </p>
      <div className="relative">
        <div className="flex gap-3 w-max animate-marquee">
          {row.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-background/60 border border-border/60 whitespace-nowrap"
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ background: p.color }}
              >
                {p.name.charAt(0)}
              </span>
              <span className="text-sm font-medium text-foreground/90">{p.name}</span>
            </div>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};

export default PartnerMarquee;
