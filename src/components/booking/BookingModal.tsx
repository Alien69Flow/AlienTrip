import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useUser } from "@/contexts/UserContext";
import { Users, CalendarIcon, Loader2 } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    type: "flight" | "stay" | "activity" | "coliving" | "restaurant" | "rental" | "package";
    price: number;
    image?: string;
  };
}

export const BookingModal = ({ isOpen, onClose, item }: BookingModalProps) => {
  const { addBooking } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const needsDateRange = ["stay", "coliving", "rental"].includes(item.type);
  const nights = (needsDateRange && date && endDate) ? Math.max(1, differenceInDays(endDate, date)) : 1;
  const subtotal = item.price * nights * (item.type === "flight" ? guests : 1);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addBooking({
        title: item.title,
        type: item.type,
        price: total,
        date: date ? format(date, "dd MMM yyyy", { locale: es }) : "Fecha pendiente",
        image: item.image,
      });
      setIsProcessing(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[500px] glass border-none">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Reservar {item.title}</DialogTitle>
              <DialogDescription>Selecciona tus fechas y detalles</DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon size={16} /> Fechas
                </label>
                <div className="bg-background/50 rounded-xl p-2 border border-border flex justify-center">
                  {needsDateRange ? (
                    <Calendar
                      mode="range"
                      selected={date && endDate ? { from: date, to: endDate } : undefined}
                      onSelect={(val) => {
                        if (val?.from) setDate(val.from);
                        if (val?.to) setEndDate(val.to);
                      }}
                      className="p-3 pointer-events-auto"
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                    />
                  ) : (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="p-3 pointer-events-auto"
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between bg-background/50 p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-muted-foreground" />
                  <span className="font-medium">Viajeros</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20"
                  >-</button>
                  <span className="w-4 text-center font-bold">{guests}</span>
                  <button 
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20"
                  >+</button>
                </div>
              </div>
            </div>

            <Button 
              className="w-full neon-glow" 
              onClick={() => setStep(2)}
              disabled={needsDateRange && !endDate}
            >
              Continuar
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Confirma tu reserva</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="glass p-4 rounded-xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.price}€ x {nights} {nights === 1 ? 'noche' : 'noches'} {item.type === "flight" ? `x ${guests} pers.` : ''}</span>
                  <span>{subtotal}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gastos de servicio</span>
                  <span>{serviceFee}€</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{total}€</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full" onClick={() => setStep(1)} disabled={isProcessing}>
                Atrás
              </Button>
              <Button className="w-full neon-glow" onClick={handleConfirm} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="animate-spin" /> : "Confirmar y Pagar"}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="py-12 text-center space-y-4">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <DialogTitle className="text-2xl">¡Reserva confirmada!</DialogTitle>
            <p className="text-muted-foreground">
              Tu reserva para {item.title} ha sido confirmada con éxito.
            </p>
            <p className="text-sm text-primary/80 mt-2 p-3 bg-primary/10 rounded-lg">
              Nota: La confirmación por email estará disponible al activar Lovable Cloud.
            </p>
            <Button className="mt-6 w-full" onClick={() => {
              onClose();
              window.location.href = "/dashboard";
            }}>
              Ver mis reservas
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
