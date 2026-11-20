import { motion } from "framer-motion";
import { Search, GitCompare, Bot, TicketCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Busca una vez",
    desc: "Dime destino, fechas y viajeros. Sin abrir veinte pestañas: una sola búsqueda.",
  },
  {
    icon: GitCompare,
    title: "Comparamos el mercado",
    desc: "Kayak, Skyscanner, Airbnb, Booking, GetYourGuide y más — ofertas reales, en vivo.",
  },
  {
    icon: Bot,
    title: "Aitor te asesora",
    desc: "Nuestra IA te recomienda qué conviene según tu presupuesto y tu estilo de viaje.",
  },
  {
    icon: TicketCheck,
    title: "Reserva sin comisiones",
    desc: "Reservas con el proveedor al precio final. Sin sobrecostes ni sorpresas.",
  },
];

const stats = [
  { value: "18+", label: "proveedores comparados" },
  { value: "12", label: "servicios en un solo sitio" },
  { value: "0 €", label: "comisiones para ti" },
  { value: "24/7", label: "asistente IA a bordo" },
];

const HowItWorks = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
          Así de simple
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          AlienTrip compara todo lo que tiene que ver con tu viaje para que tú solo decidas.
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
              <p className="text-[11px] font-bold tracking-widest text-primary mb-1">PASO {i + 1}</p>
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

export default HowItWorks;
