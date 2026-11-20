import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bot, Bus, Car, Compass, Home, Hotel,
  Menu, Package, Plane, Route, Shield, Smartphone,
  TrainFront, UtensilsCrossed, X, ChevronDown, User, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, LANGS } from "@/lib/i18n";

const Navbar = () => {
  const location = useLocation();
  const { t, lang, setLang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navKey = (to: string) =>
    `nav.${to === "/ai-planner" ? "aiPlanner" : to === "/trip-planner" ? "tripPlanner" : to.slice(1)}`;
  const mainLinks = [
    { to: "/activities", label: t("nav.activities"), icon: Compass },
    { to: "/stays", label: t("nav.stays"), icon: Hotel },
    { to: "/coliving", label: t("nav.coliving"), icon: Home },
    { to: "/packages", label: t("nav.packages"), icon: Package },
    { to: "/flights", label: t("nav.flights"), icon: Plane },
    { to: "/ai-planner", label: t("nav.aiPlanner"), icon: Bot },
    { to: "/trip-planner", label: t("nav.tripPlanner"), icon: Route },
  ];
  const moreLinks = [
    { to: "/rentals", label: t("nav.rentals"), icon: Car },
    { to: "/esim", label: t("nav.esim"), icon: Smartphone },
    { to: "/restaurants", label: t("nav.restaurants"), icon: UtensilsCrossed },
    { to: "/insurance", label: t("nav.insurance"), icon: Shield },
    { to: "/transfers", label: t("nav.transfers"), icon: Bus },
    { to: "/trains", label: t("nav.trains"), icon: TrainFront },
  ];
  const allLinks = [...mainLinks, ...moreLinks];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all group-hover:from-primary group-hover:to-accent">
              👽 AlienTrip
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3.5 py-2 text-[13px] font-medium transition-all duration-200"
                >
                <span className={active ? "text-primary" : "text-muted-foreground hover:text-foreground"}>
                  {link.label}
                </span>
                  {active && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium transition-all duration-200 rounded-full ${
                  moreLinks.some(l => location.pathname === l.to)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {t("nav.more")} <ChevronDown size={12} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-popover/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-background/50 p-2 z-50"
                    >
                      {moreLinks.map((link) => {
                        const active = location.pathname === link.to;
                        return (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMoreOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                          >
                            <link.icon size={16} className={active ? "text-primary" : "text-muted-foreground"} />
                            {link.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Auth buttons, language & Dashboard */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative mr-1">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 h-9 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Globe size={15} />
                {LANGS.find((l) => l.code === lang)?.flag}
                <ChevronDown size={11} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-popover/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-2 z-50"
                    >
                      {LANGS.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                            lang === l.code ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          <span className="w-5 text-center text-[11px] font-bold">{l.flag}</span>
                          {l.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <Link to="/dashboard" className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors mr-2">
              <User size={20} />
            </Link>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-[13px] h-9 rounded-full px-4">
              {t("nav.signin")}
            </Button>
            <Button size="sm" className="neon-glow h-9 text-[13px] rounded-full px-5">
              {t("nav.signup")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-foreground p-2 rounded-xl hover:bg-secondary/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {allLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <link.icon size={18} className={active ? "text-primary" : ""} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 flex flex-col gap-2 border-t border-border/50 mt-3">
                <div className="flex flex-wrap gap-1.5 pb-2 mb-1 border-b border-border/50">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                        lang === l.code ? "bg-primary/15 text-primary" : "bg-secondary/50 text-muted-foreground"
                      }`}
                    >
                      {l.flag}
                    </button>
                  ))}
                </div>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-2 text-sm text-foreground hover:bg-secondary/50 rounded-xl mb-2">
                  <User size={18} /> {t("nav.profile")}
                </Link>
                <Button variant="ghost" className="w-full justify-center text-sm rounded-xl">{t("nav.signin")}</Button>
                <Button className="w-full justify-center neon-glow text-sm rounded-xl">{t("nav.signup")}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
