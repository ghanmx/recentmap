import { TowingProvider } from './contexts/TowingContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StripeProvider } from './providers/StripeProvider';
import Index from './pages/Index';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TowingProvider>
        <SidebarProvider>
          <StripeProvider>
            <BrowserRouter>
              <Index />
              <Toaster />
            </BrowserRouter>
          </StripeProvider>
        </SidebarProvider>
      </TowingProvider>
    </QueryClientProvider>
  );
}

export default App;