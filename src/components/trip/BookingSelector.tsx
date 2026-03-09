import { useState } from "react";
import { Booking, useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Plus, Search, X } from "lucide-react";

interface BookingSelectorProps {
  tripId: string;
  currentBookingIds: string[];
}

const BookingSelector = ({ tripId, currentBookingIds }: BookingSelectorProps) => {
  const { bookings, addBookingToTrip, removeBookingFromTrip } = useUser();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const types = ["all", ...new Set(bookings.map((b) => b.type))];

  const filtered = bookings.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || b.type === filterType;
    return matchSearch && matchType;
  });

  const isInTrip = (id: string) => currentBookingIds.includes(id);

  return (
    <div className="space-y-4">
      {/* Search & filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar reservas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterType === type
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {type === "all" ? "Todas" : type}
          </button>
        ))}
      </div>

      {/* Booking list */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No se encontraron reservas
          </div>
        ) : (
          filtered.map((booking) => {
            const inTrip = isInTrip(booking.id);
            return (
              <Card
                key={booking.id}
                className={`border transition-all ${
                  inTrip ? "border-primary/30 bg-primary/5" : "glass border-none"
                }`}
              >
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {booking.image && (
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-foreground">{booking.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {booking.date} · {booking.price}€
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant={inTrip ? "destructive" : "secondary"}
                    className="h-8 w-8"
                    onClick={() =>
                      inTrip
                        ? removeBookingFromTrip(tripId, booking.id)
                        : addBookingToTrip(tripId, booking.id)
                    }
                  >
                    {inTrip ? <X size={14} /> : <Plus size={14} />}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingSelector;
