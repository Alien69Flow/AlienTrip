import { useParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TripTimeline from "@/components/trip/TripTimeline";
import BudgetTracker from "@/components/trip/BudgetTracker";
import BookingSelector from "@/components/trip/BookingSelector";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Edit,
  ListChecks,
  MapPin,
  Save,
} from "lucide-react";
import { useState } from "react";
import { differenceInDays, parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";

const statusOptions = [
  { value: "planning", label: "Planificando" },
  { value: "booked", label: "Reservado" },
  { value: "completed", label: "Completado" },
] as const;

const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, updateTrip, getTripBookings, getTripTotalCost } = useUser();

  const trip = trips.find((t) => t.id === id);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(trip || null);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass border-none p-8 text-center">
          <CardContent>
            <MapPin size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Viaje no encontrado</h2>
            <p className="text-muted-foreground text-sm mb-4">Este viaje no existe o fue eliminado.</p>
            <Link to="/dashboard">
              <Button variant="secondary">Ir al Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tripBookings = getTripBookings(trip.id);
  const totalCost = getTripTotalCost(trip.id);
  const days = differenceInDays(parseISO(trip.endDate), parseISO(trip.startDate)) + 1;

  const handleSave = () => {
    if (editForm) {
      updateTrip(trip.id, editForm);
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back nav */}
        <Button
          variant="ghost"
          className="mb-6 gap-1.5 text-muted-foreground"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={16} /> Mis Viajes
        </Button>

        {/* Trip header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {trip.image && (
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6">
              <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-1">{trip.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} /> {trip.destination}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {format(parseISO(trip.startDate), "d MMM", { locale: es })} — {format(parseISO(trip.endDate), "d MMM yyyy", { locale: es })}
                </span>
                <span>{days} días</span>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Status selector */}
              <div className="flex gap-1">
                {statusOptions.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => updateTrip(trip.id, { status: s.value })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      trip.status === s.value
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card className="glass border-none">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{tripBookings.length}</div>
                <div className="text-xs text-muted-foreground">Reservas</div>
              </CardContent>
            </Card>
            <Card className="glass border-none">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{totalCost}€</div>
                <div className="text-xs text-muted-foreground">Coste total</div>
              </CardContent>
            </Card>
            <Card className="glass border-none">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {trip.totalBudget ? `${Math.round((totalCost / trip.totalBudget) * 100)}%` : "—"}
                </div>
                <div className="text-xs text-muted-foreground">Presupuesto usado</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
            <TabsTrigger value="timeline" className="gap-1.5"><Calendar size={14} /> Timeline</TabsTrigger>
            <TabsTrigger value="budget" className="gap-1.5"><DollarSign size={14} /> Presupuesto</TabsTrigger>
            <TabsTrigger value="bookings" className="gap-1.5"><ListChecks size={14} /> Reservas</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            {tripBookings.length === 0 ? (
              <Card className="glass border-none text-center py-12">
                <CardContent className="text-muted-foreground">
                  <Calendar size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Añade reservas para ver el timeline</p>
                </CardContent>
              </Card>
            ) : (
              <TripTimeline
                startDate={trip.startDate}
                endDate={trip.endDate}
                bookings={tripBookings}
              />
            )}
          </TabsContent>

          <TabsContent value="budget">
            <BudgetTracker bookings={tripBookings} totalBudget={trip.totalBudget} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingSelector tripId={trip.id} currentBookingIds={trip.bookingIds} />
          </TabsContent>
        </Tabs>

        {/* Notes */}
        {trip.notes && (
          <Card className="glass border-none mt-6">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Notas</div>
              <p className="text-sm text-foreground">{trip.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TripDetail;
