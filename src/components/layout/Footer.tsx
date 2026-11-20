import { Link } from "react-router-dom";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Package, Plane, Shield, Smartphone,
  TrainFront, UtensilsCrossed, Globe, Twitter, Instagram,
  Send, Github, MessageCircle,
  CreditCard, Lock, Headphones,
} from "lucide-react";

const serviceLinks = [
  { to: "/activities", label: "Actividades", icon: Compass },
  { to: "/stays", label: "Alojamiento", icon: Hotel },
  { to: "/rentals", label: "Alquileres", icon: Car },
  { to: "/coliving", label: "Coliving", icon: Home },
  { to: "/esim", label: "eSIM", icon: Smartphone },
  { to: "/packages", label: "Paquetes", icon: Package },
];

const moreServiceLinks = [
  { to: "/restaurants", label: "Restaurantes", icon: UtensilsCrossed },
  { to: "/insurance", label: "Seguros", icon: Shield },
  { to: "/transfers", label: "Transfers", icon: Bus },
  { to: "/trains", label: "Trenes", icon: TrainFront },
  { to: "/flights", label: "Vuelos", icon: Plane },
  { to: "/ai-planner", label: "AI Planner", icon: Bot },
];

const legalLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos de uso", href: "#" },
  { label: "Cookies", href: "#" },
];

const socialLinks = [
  { icon: Twitter, href: "https://x.com/alien69flow", label: "X (Twitter)" },
  { icon: Instagram, href: "https://instagram.com/alien69flow", label: "Instagram" },
  { icon: Send, href: "https://t.me/AlienFlow", label: "Telegram" },
  { icon: Github, href: "https://github.com/Alien69Flow", label: "GitHub" },
  { icon: MessageCircle, href: "https://warpcast.com/alien69flow", label: "Farcaster" },
  { icon: Globe, href: "https://alienflow.space", label: "Web" },
];

const communityLinks = [
  { label: "Discord", href: "#", hint: "Soon" },
  { label: "Telegram", href: "https://t.me/AlienFlow" },
  { label: "Reddit — u/Alien69Flow", href: "https://reddit.com/u/Alien69Flow" },
  { label: "TikTok — @alien69flow", href: "https://tiktok.com/@alien69flow" },
  { label: "Threads — @alien69flow", href: "https://threads.net/@alien69flow" },
  { label: "Facebook — Alien69Flow", href: "https://facebook.com/Alien69Flow" },
  { label: "DoraHacks — Alien69Flow", href: "https://dorahacks.io" },
  { label: "HackMD — @Alien69Flow", href: "https://hackmd.io/@Alien69Flow" },
];

const devLinks = [
  { label: "GitHub — Alien69Flow", href: "https://github.com/Alien69Flow" },
  { label: "Farcaster — @alien69flow", href: "https://warpcast.com/alien69flow" },
  { label: "X — @alien69flow", href: "https://x.com/alien69flow" },
];

const trustBadges = [
  { icon: Lock, text: "Pago seguro" },
  { icon: CreditCard, text: "Sin comisiones ocultas" },
  { icon: Headphones, text: "Soporte 24/7" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Trust badges bar */}
        <div className="flex flex-wrap justify-center gap-6 pb-12 mb-12 border-b border-border/30">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon size={14} className="text-primary" />
              </div>
              <span className="text-xs font-medium">{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-display font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              👽 AlienTrip
            </span>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              La super-app definitiva para viajeros. 12 servicios en un solo lugar.
            </p>
            <div className="flex gap-2 mt-5">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services col 1 */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col 2 */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2.5">
              {moreServiceLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Comunidad DAO</h4>
            <ul className="space-y-2.5">
              {communityLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {l.label}
                    {l.hint && <span className="ml-1.5 text-[10px] text-primary/70">({l.hint})</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dev & official channels */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Desarrollo</h4>
            <ul className="space-y-2.5">
              {devLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

                  {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Official channels strip */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70">Official Channels</span>
          {[
            ["X", "https://x.com/alien69flow"],
            ["Instagram", "https://instagram.com/alien69flow"],
            ["Telegram", "https://t.me/AlienFlow"],
            ["GitHub", "https://github.com/Alien69Flow"],
            ["Farcaster", "https://warpcast.com/alien69flow"],
            ["Reddit", "https://reddit.com/u/Alien69Flow"],
            ["TikTok", "https://tiktok.com/@alien69flow"],
            ["Threads", "https://threads.net/@alien69flow"],
            ["Facebook", "https://facebook.com/Alien69Flow"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
          <span className="text-[11px] text-muted-foreground/50">Discord · GitBook · LinkedIn — Soon</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-muted-foreground">
              © 2026 AlienTrip · Ecosistema <span className="text-primary">AlienFlow</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              Powered by <span className="text-primary font-medium">AI Tor</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
