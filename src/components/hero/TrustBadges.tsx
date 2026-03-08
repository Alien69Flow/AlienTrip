import { Shield, Clock, Award, Sparkles, Layers } from "lucide-react";

const badges = [
  { icon: Layers, text: "12 servicios" },
  { icon: Shield, text: "Reserva segura" },
  { icon: Clock, text: "24/7" },
  { icon: Award, text: "Mejor precio" },
  { icon: Sparkles, text: "AI Tor" },
];

const TrustBadges = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-6">
    {badges.map((b, i) => (
      <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
        <b.icon className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium">{b.text}</span>
      </div>
    ))}
  </div>
);

export default TrustBadges;
