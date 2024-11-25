import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TowingProvider } from './contexts/TowingContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from './components/ui/toaster'
import { TowingWrapper } from './components/TowingWrapper'

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
      <TowingWrapper>
        <SidebarProvider>
          <TowingProvider>
            <RouterProvider router={router} />
          </TowingProvider>
        </SidebarProvider>
      </TowingWrapper>
    </QueryClientProvider>
  )
}

export default App
