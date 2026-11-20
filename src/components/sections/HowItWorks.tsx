import { motion } from "framer-motion";
import { Search, GitCompare, Bot, TicketCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HowItWorks = () => {
  const { t } = useI18n();
  const steps = [
    { icon: Search, title: t("how.step1"), desc: t("how.step1.desc") },
    { icon: GitCompare, title: t("how.step2"), desc: t("how.step2.desc") },
    { icon: Bot, title: t("how.step3"), desc: t("how.step3.desc") },
    { icon: TicketCheck, title: t("how.step4"), desc: t("how.step4.desc") },
  ];
  const stats = [
    { value: "60+", label: t("how.stats.providers") },
    { value: "12", label: t("how.stats.services") },
    { value: "0 €", label: t("how.stats.fees") },
    { value: "24/7", label: t("how.stats.assistant") },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
            {t("how.title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {t("how.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%-1rem)] w-8 border-t border-dashed border-border" />
              )}
              <div className="text-center px-2">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <s.icon size={26} className="text-primary" />
                </div>
                <p className="text-[11px] font-bold tracking-widest text-primary mb-1">
                  {t("how.step1").includes("Paso") ? "PASO" : "STEP"} {i + 1}
                </p>
                <h3 className="font-display font-semibold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-border/60 border border-border/60"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-8 text-center">
              <p className="text-3xl font-display font-bold neon-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
