import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Stays from "./pages/Stays";
import Coliving from "./pages/Coliving";
import Rentals from "./pages/Rentals";
import Activities from "./pages/Activities";
import AiPlanner from "./pages/AiPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/coliving" element={<Coliving />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/ai-planner" element={<AiPlanner />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
