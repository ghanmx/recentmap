import { useToast } from '@/hooks/use-toast'
import { MapPin } from 'lucide-react'
import { ReactNode } from 'react'
import { ToastActionElement } from '@/components/ui/toast'

const NOTIFICATION_COOLDOWN = 3000 // 3 seconds cooldown
const notificationTimestamps: { [key: string]: number } = {}

export const useMapNotifications = () => {
  const { toast } = useToast()

  const shouldShowNotification = (type: string): boolean => {
    const now = Date.now()
    const lastShown = notificationTimestamps[type] || 0

    if (now - lastShown > NOTIFICATION_COOLDOWN) {
      notificationTimestamps[type] = now
      return true
    }
    return false
  }

  const showLocationSelectionNotification = (type: 'pickup' | 'drop'): void => {
    if (!shouldShowNotification(`location_${type}`)) return

    toast({
      title:
        type === 'pickup'
          ? 'Seleccionando punto de recogida'
          : 'Seleccionando punto de entrega',
      description: `Haz clic en el mapa para seleccionar el punto de ${
        type === 'pickup' ? 'recogida' : 'entrega'
      }`,
      className:
        type === 'pickup'
          ? 'bg-green-50 border-green-200'
          : 'bg-blue-50 border-blue-200',
    })
  }

  const showRouteCalculationError = (error: string): void => {
    if (!shouldShowNotification('route_error')) return

    toast({
      title: 'Error al calcular la ruta',
      description: error,
      variant: 'destructive',
    })
  }

  const showLocationUpdateSuccess = (
    type: 'pickup' | 'drop',
    address: string,
  ): void => {
    if (!shouldShowNotification(`location_update_${type}`)) return

    toast({
      title: `${
        type === 'pickup' ? 'Punto de recogida' : 'Punto de entrega'
      } actualizado`,
      description: address,
      className:
        type === 'pickup'
          ? 'bg-green-50 border-green-200'
          : 'bg-blue-50 border-blue-200',
    })
  }

  return {
    showLocationSelectionNotification,
    showRouteCalculationError,
    showLocationUpdateSuccess,
  }
}
