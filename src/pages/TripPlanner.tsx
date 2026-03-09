import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
  { name: "Tokio, Japón", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400" },
  { name: "Barcelona, España", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400" },
  { name: "Lisboa, Portugal", image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400" },
  { name: "Medellín, Colombia", image: "https://images.unsplash.com/photo-1599413987323-39776d753e8c?w=400" },
  { name: "Cancún, México", image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=400" },
];

const TripPlanner = () => {
  const navigate = useNavigate();
  const { createTrip, bookings } = useUser();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    notes: "",
    selectedBookings: [] as string[],
    image: "",
  });

  const steps = [
    { label: "Destino y Fechas", icon: MapPin },
    { label: "Presupuesto", icon: DollarSign },
    { label: "Reservas", icon: Calendar },
    { label: "Revisión", icon: Check },
  ];

  const canProceed = () => {
    if (step === 0) return form.destination && form.startDate && form.endDate;
    return true;
  };

  const handleCreate = () => {
    const tripId = createTrip({
      title: form.title || `Viaje a ${form.destination}`,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      bookingIds: form.selectedBookings,
      status: "planning",
      totalBudget: form.totalBudget ? Number(form.totalBudget) : undefined,
      notes: form.notes || undefined,
      image: form.image || undefined,
    });
    navigate(`/trip/${tripId}`);
  };

  const toggleBooking = (id: string) => {
    setForm((prev) => ({
      ...prev,
      selectedBookings: prev.selectedBookings.includes(id)
        ? prev.selectedBookings.filter((b) => b !== id)
        : [...prev.selectedBookings, id],
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Sparkles className="text-primary" size={16} />
            <span className="text-sm font-medium text-foreground">Trip Planner</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Planifica tu <span className="neon-text">viaje</span>
          </h1>
          <p className="text-muted-foreground">Crea un itinerario paso a paso</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === step
                    ? "bg-primary/20 text-primary"
                    : i < step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <s.icon size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <Card className="glass border-none">
                <CardHeader>
                  <CardTitle className="text-lg">¿A dónde quieres ir?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nombre del viaje (opcional)</Label>
                    <Input
                      placeholder="Mi aventura en..."
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Destino *</Label>
                    <Input
                      placeholder="Ciudad, país o región"
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>

                  {/* Quick destination picks */}
                  <div className="grid grid-cols-3 gap-2">
                    {destinations.map((d) => (
                      <button
                        key={d.name}
                        onClick={() => setForm({ ...form, destination: d.name, image: d.image })}
                        className={`relative rounded-xl overflow-hidden h-20 group transition-all ${
                          form.destination === d.name ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-background/60 flex items-end p-2">
                          <span className="text-[11px] font-medium text-foreground">{d.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha inicio *</Label>
                      <Input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fecha fin *</Label>
                      <Input
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card className="glass border-none">
                <CardHeader>
                  <CardTitle className="text-lg">Presupuesto y notas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Presupuesto total (€)</Label>
                    <Input
                      type="number"
                      placeholder="2000"
                      value={form.totalBudget}
                      onChange={(e) => setForm({ ...form, totalBudget: e.target.value })}
                      className="bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Opcional — te ayudará a controlar los gastos
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Notas</Label>
                    <Textarea
                      placeholder="Intereses, requisitos especiales, ideas..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="glass border-none">
                <CardHeader>
                  <CardTitle className="text-lg">Añadir reservas existentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                      <p>No tienes reservas todavía.</p>
                      <p className="text-xs mt-1">Puedes añadirlas después desde el detalle del viaje.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                      {bookings.map((b) => {
                        const selected = form.selectedBookings.includes(b.id);
                        return (
                          <button
                            key={b.id}
                            onClick={() => toggleBooking(b.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                              selected
                                ? "bg-primary/10 border border-primary/30"
                                : "bg-secondary/30 border border-transparent hover:bg-secondary/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {b.image && (
                                <img src={b.image} alt={b.title} className="w-9 h-9 rounded-lg object-cover" />
                              )}
                              <div>
                                <div className="text-sm font-medium text-foreground">{b.title}</div>
                                <div className="text-xs text-muted-foreground">{b.date} · {b.price}€</div>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selected ? "bg-primary border-primary" : "border-muted-foreground/30"
                            }`}>
                              {selected && <Check size={12} className="text-primary-foreground" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="glass border-none">
                <CardHeader>
                  <CardTitle className="text-lg">Resumen del viaje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {form.image && (
                    <img src={form.image} alt={form.destination} className="w-full h-40 object-cover rounded-xl" />
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Destino</div>
                      <div className="text-sm font-medium text-foreground">{form.destination}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Nombre</div>
                      <div className="text-sm font-medium text-foreground">{form.title || `Viaje a ${form.destination}`}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Fechas</div>
                      <div className="text-sm font-medium text-foreground">{form.startDate} → {form.endDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Presupuesto</div>
                      <div className="text-sm font-medium text-foreground">{form.totalBudget ? `${form.totalBudget}€` : "Sin definir"}</div>
                    </div>
                  </div>
                  {form.notes && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Notas</div>
                      <div className="text-sm text-foreground bg-secondary/30 rounded-lg p-3">{form.notes}</div>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {form.selectedBookings.length} reserva{form.selectedBookings.length !== 1 ? "s" : ""} vinculada{form.selectedBookings.length !== 1 ? "s" : ""}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className="gap-1.5"
          >
            <ArrowLeft size={16} /> Atrás
          </Button>
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="neon-glow gap-1.5"
            >
              Siguiente <ArrowRight size={16} />
            </Button>
          ) : (
            <Button onClick={handleCreate} className="neon-glow gap-1.5">
              <Sparkles size={16} /> Crear Viaje
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
