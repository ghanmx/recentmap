import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { AdminNavigationMenu } from './AdminNavigationMenu'
import { AdminMetrics } from './AdminMetrics'
import { ReservationManagement } from './ReservationManagement'
import { useToast } from '@/hooks/use-toast'

export const AdminPanel = () => {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'Panel de Administración',
      description: 'Bienvenido al panel de control administrativo',
    })
  }, [toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <AdminNavigationMenu />
        </div>
        
        <div className="md:col-span-9 space-y-6">
          <Card className="p-6">
            <AdminMetrics />
          </Card>

          <Card className="p-6">
            <ReservationManagement />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel