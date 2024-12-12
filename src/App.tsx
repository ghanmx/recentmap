import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StripeProvider } from './providers/StripeProvider'
import { SidebarProvider } from './contexts/SidebarContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { TowingProvider } from '@/contexts/TowingContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StripeProvider>
          <TowingProvider>
            <SidebarProvider>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative z-10">
                  <RouterProvider router={router} />
                </div>
                <Toaster />
              </div>
            </SidebarProvider>
          </TowingProvider>
        </StripeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App