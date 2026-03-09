import { Trip } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isWithinInterval,
  parseISO,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

interface TripCalendarViewProps {
  trips: Trip[];
}

const TripCalendarView = ({ trips }: TripCalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTripsForDay = (day: Date) =>
    trips.filter((trip) =>
      isWithinInterval(day, {
        start: parseISO(trip.startDate),
        end: parseISO(trip.endDate),
      })
    );

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <Card className="glass border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-display">Calendario de Viajes</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: es })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Week headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs text-muted-foreground font-medium py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const dayTrips = getTripsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <div
                key={i}
                className={`min-h-[60px] p-1 rounded-lg text-xs transition-colors ${
                  isCurrentMonth ? "" : "opacity-30"
                } ${dayTrips.length > 0 ? "bg-primary/5" : ""}`}
              >
                <div className="text-muted-foreground mb-1">{format(day, "d")}</div>
                {dayTrips.slice(0, 2).map((trip) => (
                  <Link
                    key={trip.id}
                    to={`/trip/${trip.id}`}
                    className="block truncate text-[10px] px-1 py-0.5 rounded bg-primary/20 text-primary mb-0.5 hover:bg-primary/30 transition-colors"
                  >
                    <MapPin size={8} className="inline mr-0.5" />
                    {trip.destination}
                  </Link>
                ))}
                {dayTrips.length > 2 && (
                  <div className="text-[10px] text-muted-foreground px-1">
                    +{dayTrips.length - 2} más
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCalendarView;
