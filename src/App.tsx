import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { TowingProvider } from '@/contexts/towing/TowingContext'
import { MapPage } from '@/features/map'
import { UserPage } from '@/components/UserPage'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { Layout } from '@/components/layout/Layout'

function App() {
  return (
    <TowingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </TowingProvider>
  )
}

export default App