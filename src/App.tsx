import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import MapPage from '@/features/map'
import { UserPage } from '@/components/UserPage'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { Layout } from '@/components/layout/Layout'
import { TowingProvider } from '@/contexts/towing/TowingContext'
import Landing from '@/pages/Landing'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<MapPage />} />
          <Route 
            path="/user" 
            element={
              <TowingProvider>
                <UserPage />
              </TowingProvider>
            } 
          />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  )
}

export default App