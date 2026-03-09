import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, Plane, Trash2 } from "lucide-react";
import { Trip, useUser } from "@/contexts/UserContext";
import { format, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";

const statusConfig = {
  planning: { label: "Planificando", className: "bg-accent/20 text-accent-foreground" },
  booked: { label: "Reservado", className: "bg-primary/20 text-primary" },
  completed: { label: "Completado", className: "bg-muted text-muted-foreground" },
};

const TripCard = ({ trip, index = 0 }: { trip: Trip; index?: number }) => {
  const { getTripTotalCost, getTripBookings, deleteTrip } = useUser();
  const totalCost = getTripTotalCost(trip.id);
  const tripBookings = getTripBookings(trip.id);
  const days = differenceInDays(parseISO(trip.endDate), parseISO(trip.startDate)) + 1;
  const budgetPercent = trip.totalBudget ? Math.min((totalCost / trip.totalBudget) * 100, 100) : 0;
  const status = statusConfig[trip.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="glass border-none overflow-hidden group hover:border-primary/20 transition-all">
        <div className="flex flex-col md:flex-row">
          {trip.image && (
            <div className="w-full md:w-56 h-40 md:h-auto overflow-hidden">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <CardContent className="flex-1 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-1">{trip.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {trip.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {days} días
                  </span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}>
                {status.label}
              </span>
            </div>

            <div className="text-xs text-muted-foreground mb-3">
              {format(parseISO(trip.startDate), "d MMM", { locale: es })} — {format(parseISO(trip.endDate), "d MMM yyyy", { locale: es })}
            </div>

            {trip.totalBudget && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Presupuesto</span>
                  <span className={budgetPercent > 90 ? "text-destructive" : "text-foreground"}>
                    {totalCost}€ / {trip.totalBudget}€
                  </span>
                </div>
                <Progress
                  value={budgetPercent}
                  className="h-1.5"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Plane size={14} />
                <span>{tripBookings.length} reserva{tripBookings.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTrip(trip.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
                <Link to={`/trip/${trip.id}`}>
                  <Button size="sm" variant="secondary" className="h-8 text-xs">
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default TripCard;
