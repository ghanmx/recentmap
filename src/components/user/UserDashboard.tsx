import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserProfile } from './UserProfile'
import { UserReservations } from './UserReservations'
import { UserSettings } from './UserSettings'
import { UserNotifications } from './UserNotifications'
import { useProfile } from '@/hooks/useProfile'
import { Loader2, ArrowLeft, MapIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const { profile, isLoading } = useProfile()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenido, {profile?.full_name || 'Usuario'}
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona tus servicios y preferencias desde aquí
            </p>
          </motion.div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/map')}
              className="flex items-center gap-2"
            >
              <MapIcon className="h-4 w-4" />
              Request Service
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="reservations">Servicios</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          <TabsContent value="reservations">
            <UserReservations />
          </TabsContent>
          <TabsContent value="notifications">
            <UserNotifications />
          </TabsContent>
          <TabsContent value="settings">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}