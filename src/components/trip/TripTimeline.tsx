import { Booking } from "@/contexts/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Hotel, Plane, Compass, Car, UtensilsCrossed, Package, Home } from "lucide-react";
import { format, parseISO, eachDayOfInterval, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

const typeIcons: Record<string, typeof Plane> = {
  flight: Plane,
  stay: Hotel,
  activity: Compass,
  rental: Car,
  restaurant: UtensilsCrossed,
  package: Package,
  coliving: Home,
};

const typeColors: Record<string, string> = {
  flight: "bg-accent/20 text-accent-foreground border-accent/30",
  stay: "bg-primary/20 text-primary border-primary/30",
  activity: "bg-[hsl(var(--alien-blue))]/20 text-[hsl(var(--alien-blue))] border-[hsl(var(--alien-blue))]/30",
  rental: "bg-muted text-muted-foreground border-border",
  restaurant: "bg-destructive/20 text-destructive border-destructive/30",
  package: "bg-primary/20 text-primary border-primary/30",
  coliving: "bg-accent/20 text-accent-foreground border-accent/30",
};

interface TripTimelineProps {
  startDate: string;
  endDate: string;
  bookings: Booking[];
}

const TripTimeline = ({ startDate, endDate, bookings }: TripTimelineProps) => {
  const days = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  return (
    <div className="space-y-4">
      {days.map((day, i) => {
        const dayBookings = bookings.filter((b) =>
          isSameDay(parseISO(b.date), day)
        );

        return (
          <div key={i} className="flex gap-4">
            {/* Day marker */}
            <div className="flex flex-col items-center shrink-0 w-16">
              <div className="text-xs text-muted-foreground font-medium uppercase">
                {format(day, "EEE", { locale: es })}
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                {format(day, "d")}
              </div>
              {i < days.length - 1 && (
                <div className="w-px h-full min-h-[2rem] bg-border mt-2" />
              )}
            </div>

            {/* Day content */}
            <div className="flex-1 pb-4">
              {dayBookings.length === 0 ? (
                <div className="py-3 px-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground/50 flex items-center gap-2">
                  <Calendar size={14} />
                  Día libre
                </div>
              ) : (
                <div className="space-y-2">
                  {dayBookings.map((booking) => {
                    const Icon = typeIcons[booking.type] || Compass;
                    const colorClass = typeColors[booking.type] || "bg-secondary text-foreground border-border";
                    return (
                      <Card key={booking.id} className={`border ${colorClass} bg-opacity-10`}>
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center">
                              <Icon size={16} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{booking.title}</div>
                              <div className="text-xs text-muted-foreground capitalize">{booking.type}</div>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-foreground">{booking.price}€</div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripTimeline;
