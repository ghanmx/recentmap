import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StripeProvider } from "./providers/StripeProvider";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import UserPage from "./pages/UserPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StripeProvider>
        <BrowserRouter>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8 lg:ml-64">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/user" element={<UserPage />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </StripeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;