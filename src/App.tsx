import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StripeProvider } from "./providers/StripeProvider";
import { TowingProvider } from "./contexts/TowingContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TowingProvider>
        <StripeProvider>
          <SidebarProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative z-10">
                <RouterProvider router={router} />
              </div>
              <Toaster />
            </div>
          </SidebarProvider>
        </StripeProvider>
      </TowingProvider>
    </QueryClientProvider>
  );
}

export default App;