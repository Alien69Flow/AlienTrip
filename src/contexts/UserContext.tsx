import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export type Booking = {
  id: string;
  title: string;
  type: "flight" | "stay" | "activity" | "coliving" | "restaurant" | "rental" | "package" | "transfer" | "train" | "esim" | "insurance";
  date: string;
  price: number;
  status: "confirmed" | "pending" | "completed";
  image?: string;
  tripId?: string;
};

export type Favorite = {
  id: string;
  title: string;
  type: string;
  price: number;
  image?: string;
  rating?: number;
};

export type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  bookingIds: string[];
  status: "planning" | "booked" | "completed";
  totalBudget?: number;
  notes?: string;
  image?: string;
};

export type UserProfile = {
  name: string;
  email: string;
  avatar: string;
  preferences: string[];
};

type UserContextType = {
  bookings: Booking[];
  favorites: Favorite[];
  trips: Trip[];
  profile: UserProfile;
  addBooking: (booking: Omit<Booking, "id" | "status" | "tripId">) => void;
  toggleFavorite: (item: Favorite) => void;
  isFavorite: (id: string) => boolean;
  updateProfile: (profile: Partial<UserProfile>) => void;
  createTrip: (tripData: Omit<Trip, "id">) => string;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addBookingToTrip: (tripId: string, bookingId: string) => void;
  removeBookingFromTrip: (tripId: string, bookingId: string) => void;
  getTripBookings: (tripId: string) => Booking[];
  getTripTotalCost: (tripId: string) => number;
};

const defaultProfile: UserProfile = {
  name: "Usuario Viajero",
  email: "usuario@alientrip.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  preferences: ["Playa", "Aventura"],
};

type DbTrip = {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  status: Trip["status"];
  total_budget: number | null;
  notes: string | null;
  image: string | null;
};

type DbBooking = {
  id: string;
  title: string;
  type: Booking["type"];
  date: string;
  price: number;
  status: Booking["status"];
  image: string | null;
  trip_id: string | null;
};

const tripFromDb = (t: DbTrip): Trip => ({
  id: t.id,
  title: t.title,
  destination: t.destination,
  startDate: t.start_date,
  endDate: t.end_date,
  status: t.status,
  totalBudget: t.total_budget ?? undefined,
  notes: t.notes ?? undefined,
  image: t.image ?? undefined,
  bookingIds: [],
});

const bookingFromDb = (b: DbBooking): Booking => ({
  id: b.id,
  title: b.title,
  type: b.type,
  date: b.date,
  price: Number(b.price),
  status: b.status,
  image: b.image ?? undefined,
  tripId: b.trip_id ?? undefined,
});

const tripToDb = (updates: Partial<Trip>) => {
  const row: Record<string, unknown> = {};
  if (updates.title !== undefined) row.title = updates.title;
  if (updates.destination !== undefined) row.destination = updates.destination;
  if (updates.startDate !== undefined) row.start_date = updates.startDate;
  if (updates.endDate !== undefined) row.end_date = updates.endDate;
  if (updates.status !== undefined) row.status = updates.status;
  if (updates.totalBudget !== undefined) row.total_budget = updates.totalBudget;
  if (updates.notes !== undefined) row.notes = updates.notes;
  if (updates.image !== undefined) row.image = updates.image;
  return row;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("alientrip_profile");
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem("alientrip_profile", JSON.stringify(profile));
  }, [profile]);

  const loadData = async () => {
    const [tripsRes, bookingsRes, favsRes] = await Promise.all([
      supabase.from("trips").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("favorites").select("*").order("created_at", { ascending: false }),
    ]);

    if (tripsRes.error || bookingsRes.error || favsRes.error) {
      console.error("Error loading data", tripsRes.error || bookingsRes.error || favsRes.error);
      toast.error("No se pudieron cargar tus datos");
      return;
    }

    const dbBookings = (bookingsRes.data as DbBooking[]).map(bookingFromDb);
    setBookings(dbBookings);
    setFavorites(favsRes.data as Favorite[]);
    setTrips((tripsRes.data as DbTrip[]).map((t) => {
      const trip = tripFromDb(t);
      trip.bookingIds = dbBookings.filter((b) => b.tripId === trip.id).map((b) => b.id);
      return trip;
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addBooking = (bookingData: Omit<Booking, "id" | "status" | "tripId">) => {
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          title: bookingData.title,
          type: bookingData.type,
          date: bookingData.date,
          price: bookingData.price,
          image: bookingData.image ?? null,
          status: "confirmed",
        })
        .select()
        .single();
      if (error || !data) {
        console.error(error);
        toast.error("No se pudo guardar la reserva");
        return;
      }
      setBookings((prev) => [bookingFromDb(data as DbBooking), ...prev]);
    })();
  };

  const toggleFavorite = (item: Favorite) => {
    const exists = favorites.some((fav) => fav.id === item.id);
    if (exists) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
      toast.success("Eliminado de favoritos");
      (async () => {
        const { error } = await supabase.from("favorites").delete().eq("id", item.id);
        if (error) console.error(error);
      })();
    } else {
      setFavorites((prev) => [...prev, item]);
      toast.success("Añadido a favoritos");
      (async () => {
        const { error } = await supabase.from("favorites").upsert({
          id: item.id,
          title: item.title,
          type: item.type,
          price: item.price,
          image: item.image ?? null,
          rating: item.rating ?? null,
        });
        if (error) console.error(error);
      })();
    }
  };

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    toast.success("Perfil actualizado");
  };

  const createTrip = (tripData: Omit<Trip, "id">): string => {
    const tempId = `temp-${Math.random().toString(36).slice(2, 9)}`;
    setTrips((prev) => [{ ...tripData, id: tempId }, ...prev]);
    (async () => {
      const { data, error } = await supabase
        .from("trips")
        .insert({
          title: tripData.title,
          destination: tripData.destination,
          start_date: tripData.startDate,
          end_date: tripData.endDate,
          status: tripData.status,
          total_budget: tripData.totalBudget ?? null,
          notes: tripData.notes ?? null,
          image: tripData.image ?? null,
        })
        .select()
        .single();
      if (error || !data) {
        console.error(error);
        toast.error("No se pudo crear el viaje");
        setTrips((prev) => prev.filter((t) => t.id !== tempId));
        return;
      }
      const trip = tripFromDb(data as DbTrip);
      if (tripData.bookingIds.length > 0) {
        const { error: linkError } = await supabase
          .from("bookings")
          .update({ trip_id: trip.id })
          .in("id", tripData.bookingIds);
        if (linkError) console.error(linkError);
        setBookings((prev) =>
          prev.map((b) =>
            tripData.bookingIds.includes(b.id) ? { ...b, tripId: trip.id } : b
          )
        );
      }
      trip.bookingIds = tripData.bookingIds;
      setTrips((prev) => prev.map((t) => (t.id === tempId ? trip : t)));
      toast.success(`Viaje "${tripData.title}" creado`);
    })();
    return tempId;
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((trip) => (trip.id === id ? { ...trip, ...updates } : trip))
    );
    toast.success("Viaje actualizado");
    if (id.startsWith("temp-")) return;
    (async () => {
      const { error } = await supabase
        .from("trips")
        .update(tripToDb(updates))
        .eq("id", id);
      if (error) console.error(error);
    })();
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
    setBookings((prev) =>
      prev.map((b) => (b.tripId === id ? { ...b, tripId: undefined } : b))
    );
    toast.success("Viaje eliminado");
    if (id.startsWith("temp-")) return;
    (async () => {
      const { error } = await supabase.from("trips").delete().eq("id", id);
      if (error) console.error(error);
    })();
  };

  const addBookingToTrip = (tripId: string, bookingId: string) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, bookingIds: [...new Set([...trip.bookingIds, bookingId])] }
          : trip
      )
    );
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, tripId } : b))
    );
    toast.success("Reserva añadida al viaje");
    (async () => {
      const { error } = await supabase
        .from("bookings")
        .update({ trip_id: tripId })
        .eq("id", bookingId);
      if (error) console.error(error);
    })();
  };

  const removeBookingFromTrip = (tripId: string, bookingId: string) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, bookingIds: trip.bookingIds.filter((id) => id !== bookingId) }
          : trip
      )
    );
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId && b.tripId === tripId ? { ...b, tripId: undefined } : b))
    );
    toast.success("Reserva eliminada del viaje");
    (async () => {
      const { error } = await supabase
        .from("bookings")
        .update({ trip_id: null })
        .eq("id", bookingId);
      if (error) console.error(error);
    })();
  };

  const getTripBookings = (tripId: string): Booking[] => {
    return bookings.filter((booking) => booking.tripId === tripId);
  };

  const getTripTotalCost = (tripId: string): number => {
    return getTripBookings(tripId).reduce((total, booking) => total + booking.price, 0);
  };

  return (
    <UserContext.Provider
      value={{
        bookings,
        favorites,
        trips,
        profile,
        addBooking,
        toggleFavorite,
        isFavorite,
        updateProfile,
        createTrip,
        updateTrip,
        deleteTrip,
        addBookingToTrip,
        removeBookingFromTrip,
        getTripBookings,
        getTripTotalCost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
