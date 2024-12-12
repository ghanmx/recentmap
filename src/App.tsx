import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { StripeProvider } from '@/providers/StripeProvider'
import { TowingProvider } from '@/contexts/TowingContext'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Toaster } from '@/components/ui/toaster'
import { Routes } from '@/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TowingProvider>
          <StripeProvider>
            <SidebarProvider>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <Routes />
                <Toaster />
              </div>
            </SidebarProvider>
          </StripeProvider>
        </TowingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App