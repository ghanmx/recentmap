import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { UserProfile } from './user/UserProfile'
import { UserReservations } from './user/UserReservations'
import { UserNotifications } from './user/UserNotifications'
import { UserNavigationMenu } from './user/UserNavigationMenu'
import { useTowing } from '@/contexts/towing/TowingContext'
import { useToast } from '@/hooks/use-toast'

export const UserPage = () => {
  const { toast } = useToast()
  const { totalDistance, totalCost } = useTowing()

  useEffect(() => {
    toast({
      title: 'Bienvenido a tu panel de usuario',
      description: 'Aquí podrás ver tus reservas y gestionar tu perfil',
    })
  }, [toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <UserNavigationMenu />
        </div>
        
        <div className="md:col-span-9 space-y-6">
          <Card className="p-6">
            <UserProfile />
          </Card>

          <Card className="p-6">
            <UserReservations />
          </Card>

          <Card className="p-6">
            <UserNotifications />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserPage