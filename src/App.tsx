import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StripeProvider } from "./providers/StripeProvider";
import { TowingProvider } from "@/contexts/TowingContext";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StripeProvider>
        <TowingProvider>
          <BrowserRouter>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              <Sidebar />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 mx-auto max-w-7xl w-full">
                <Routes>
                  <Route path="/" element={<Index />} />
                </Routes>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TowingProvider>
      </StripeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;