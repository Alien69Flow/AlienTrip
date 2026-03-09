import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type Booking = {
  id: string;
  title: string;
  type: "flight" | "stay" | "activity" | "coliving" | "restaurant" | "rental" | "package";
  date: string;
  price: number;
  status: "confirmed" | "pending" | "completed";
  image?: string;
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
  bookingIds: string[]; // References to existing bookings
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
  addBooking: (booking: Omit<Booking, "id" | "status">) => void;
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

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("alientrip_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem("alientrip_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("alientrip_profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem("alientrip_trips");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("alientrip_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("alientrip_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("alientrip_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("alientrip_trips", JSON.stringify(trips));
  }, [trips]);

  const addBooking = (bookingData: Omit<Booking, "id" | "status">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: "confirmed",
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const toggleFavorite = (item: Favorite) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === item.id);
      if (exists) {
        toast.success("Eliminado de favoritos");
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        toast.success("Añadido a favoritos");
        return [...prev, item];
      }
    });
  };

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    toast.success("Perfil actualizado");
  };

  const createTrip = (tripData: Omit<Trip, "id">): string => {
    const newTrip: Trip = {
      ...tripData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTrips((prev) => [newTrip, ...prev]);
    toast.success(`Viaje "${tripData.title}" creado`);
    return newTrip.id;
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prev) => 
      prev.map((trip) => 
        trip.id === id ? { ...trip, ...updates } : trip
      )
    );
    toast.success("Viaje actualizado");
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
    toast.success("Viaje eliminado");
  };

  const addBookingToTrip = (tripId: string, bookingId: string) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, bookingIds: [...new Set([...trip.bookingIds, bookingId])] }
          : trip
      )
    );
    toast.success("Reserva añadida al viaje");
  };

  const removeBookingFromTrip = (tripId: string, bookingId: string) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, bookingIds: trip.bookingIds.filter((id) => id !== bookingId) }
          : trip
      )
    );
    toast.success("Reserva eliminada del viaje");
  };

  const getTripBookings = (tripId: string): Booking[] => {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return [];
    return bookings.filter((booking) => trip.bookingIds.includes(booking.id));
  };

  const getTripTotalCost = (tripId: string): number => {
    const tripBookings = getTripBookings(tripId);
    return tripBookings.reduce((total, booking) => total + booking.price, 0);
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
