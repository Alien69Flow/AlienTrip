import { useState } from "react";
import { Hotel, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { FilterBar, ViewMode } from "@/components/filters/FilterBar";
import { MapView } from "@/components/filters/MapView";
import { FavoriteButton } from "@/components/FavoriteButton";
import { BookingModal } from "@/components/booking/BookingModal";

const PLACEHOLDER = "/placeholder.svg";

const mockStays = [
  { id: 1, name: "Hotel Arts Barcelona", location: "Barcelona, España", price: 180, rating: 4.8, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop", type: "Hotel", lat: 41.3851, lng: 2.1734 },
  { id: 2, name: "Riad Marrakesch", location: "Marrakech, Marruecos", price: 95, rating: 4.6, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&auto=format&fit=crop", type: "Riad", lat: 31.6295, lng: -7.9811 },
  { id: 3, name: "Hostel One Prague", location: "Praga, Rep. Checa", price: 25, rating: 4.5, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop", type: "Hostel", lat: 50.0755, lng: 14.4378 },
  { id: 4, name: "Eco Lodge Bali", location: "Ubud, Indonesia", price: 65, rating: 4.9, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop", type: "Lodge", lat: -8.5069, lng: 115.2625 },
  { id: 5, name: "Apartamento Alfama", location: "Lisboa, Portugal", price: 110, rating: 4.7, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&auto=format&fit=crop", type: "Apartamento", lat: 38.7223, lng: -9.1393 },
  { id: 6, name: "Capsule Hotel Tokyo", location: "Tokio, Japón", price: 40, rating: 4.4, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop", type: "Cápsula", lat: 35.6762, lng: 139.6503 },
];

const filterCategories = [
  { id: "hotel", label: "Hoteles" },
  { id: "hostel", label: "Hostels" },
  { id: "apartamento", label: "Apartamentos" },
  { id: "lodge", label: "Lodges" },
  { id: "capsula", label: "Cápsulas" },
];

const Stays = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filteredStays, setFilteredStays] = useState(mockStays);
  const [bookingItem, setBookingItem] = useState<any>(null);

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockStays];
    if (filters.priceRange) {
      filtered = filtered.filter(s => s.price >= filters.priceRange[0] && s.price <= filters.priceRange[1]);
    }
    if (filters.minRating > 0) {
      filtered = filtered.filter(s => s.rating >= filters.minRating);
    }
    setFilteredStays(filtered);
  };

  const mapLocations = filteredStays.map(s => ({
    id: s.id.toString(),
    lat: s.lat,
    lng: s.lng,
    price: s.price,
    title: s.name
  }));

  const StayCard = ({ s, i }: any) => (
    <motion.div
      key={s.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      className="glass rounded-2xl overflow-hidden group hover:neon-border transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={s.image}
          alt={s.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">{s.type}</span>
        <div className="absolute top-3 right-3">
          <FavoriteButton item={{ id: `stay-${s.id}`, title: s.name, type: "stay", price: s.price, rating: s.rating, image: s.image }} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-foreground mb-1">{s.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin size={13} /> {s.location}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-foreground">{s.rating}</span>
          </div>
          <span className="text-primary font-display font-bold">{s.price}€<span className="text-xs text-muted-foreground font-normal">/noche</span></span>
        </div>
        <Button 
          className="w-full neon-glow" 
          size="sm"
          onClick={() => setBookingItem({
            id: s.id.toString(),
            title: s.name,
            type: "stay" as const,
            price: s.price,
            image: s.image
          })}
        >
          Reservar
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Hotel className="text-amber-400" size={28} />
          <h1 className="text-3xl font-display font-bold text-foreground">Alojamiento</h1>
        </div>
        <p className="text-muted-foreground mb-8">Hoteles, hostels, apartamentos y experiencias únicas</p>

        <FilterBar 
          viewMode={viewMode}
          onViewChange={setViewMode}
          resultCount={filteredStays.length}
          onSortChange={(sort) => console.log(sort)}
        />

        <div className="flex gap-8">
          {viewMode !== "map" && (
            <FilterSidebar 
              categories={filterCategories}
              maxPrice={200}
              onFilterChange={handleFilterChange}
            />
          )}

          <div className="flex-1 min-h-[600px]">
            {viewMode === "list" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStays.map((s, i) => <StayCard key={s.id} s={s} i={i} />)}
              </div>
            )}

            {viewMode === "map" && (
              <div className="h-[600px] w-full">
                <MapView locations={mapLocations} />
              </div>
            )}

            {viewMode === "split" && (
              <div className="grid grid-cols-2 gap-6 h-[600px]">
                <div className="overflow-y-auto space-y-4 pr-2">
                  {filteredStays.map((s, i) => (
                    <div key={s.id} className="glass rounded-xl p-4 flex gap-4">
                      <img src={s.image} alt={s.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{s.name}</h4>
                        <p className="text-sm text-muted-foreground">{s.location}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-primary font-bold">{s.price}€/noche</span>
                          <Button size="sm" onClick={() => setBookingItem({
                            id: s.id.toString(),
                            title: s.name,
                            type: "stay" as const,
                            price: s.price,
                            image: s.image
                          })}>Reservar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <MapView locations={mapLocations} />
              </div>
            )}
          </div>
        </div>

        {bookingItem && (
          <BookingModal 
            isOpen={!!bookingItem}
            onClose={() => setBookingItem(null)}
            item={bookingItem}
          />
        )}
      </div>
    </div>
  );
};

export default Stays;
