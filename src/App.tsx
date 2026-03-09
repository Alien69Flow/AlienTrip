import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import TripPlanner from "./pages/TripPlanner";
import TripDetail from "./pages/TripDetail";
import Coliving from "./pages/Coliving";
import Esim from "./pages/Esim";
import Flights from "./pages/Flights";
import Index from "./pages/Index";
import Insurance from "./pages/Insurance";
import NotFound from "./pages/NotFound";
import Packages from "./pages/Packages";
import Rentals from "./pages/Rentals";
import Restaurants from "./pages/Restaurants";
import Stays from "./pages/Stays";
import Trains from "./pages/Trains";
import Transfers from "./pages/Transfers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/trip/:id" element={<TripDetail />} />
            <Route path="/coliving" element={<Coliving />} />
            <Route path="/esim" element={<Esim />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
