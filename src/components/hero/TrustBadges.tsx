import { Shield, Clock, Award, Sparkles, Layers } from "lucide-react";

const TrustBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {[
        { icon: Layers, text: "12 servicios integrados" },
        { icon: Shield, text: "Reserva segura" },
        { icon: Clock, text: "Soporte 24/7" },
        { icon: Award, text: "Mejor precio garantizado" },
        { icon: Sparkles, text: "Powered by AI Tor" },
      ].map((badge, index) => (
        <div key={index} className="flex items-center text-muted-foreground">
          <badge.icon className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm font-medium">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
