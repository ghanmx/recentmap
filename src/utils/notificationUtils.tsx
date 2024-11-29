import { toast } from '@/hooks/use-toast'
import { Check, AlertTriangle, Info, MapPin } from 'lucide-react'

const NOTIFICATION_COOLDOWN = 10000
const notificationTimestamps: { [key: string]: number } = {}

const shouldShowNotification = (type: string): boolean => {
  const now = Date.now()
  const lastShown = notificationTimestamps[type] || 0

  if (now - lastShown > NOTIFICATION_COOLDOWN) {
    notificationTimestamps[type] = now
    return true
  }
  return false
}

export const showLocationNotification = (
  type: 'pickup' | 'drop',
  coords: { lat: number; lng: number },
) => {
  if (!shouldShowNotification(`location_${type}`)) return

  toast({
    title: `${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`,
    description: (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        <span>
          Coordinates: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </span>
      </div>
    ),
    duration: 5000,
    className: 'bg-green-50 border-green-200',
  })
}

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification('route')) return

  toast({
    title: 'Route Calculated',
    description: (
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        <span>Total route distance: {distance.toFixed(2)} km</span>
      </div>
    ),
    duration: 5000,
    className: 'bg-blue-50 border-blue-200',
  })
}

export const showRouteErrorNotification = (error: string) => {
  if (!shouldShowNotification('route_error')) return

  toast({
    title: 'Route Calculation Error',
    description: (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    ),
    duration: 7000,
    variant: 'destructive',
  })
}

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification('payment')) return

  if (success) {
    toast({
      title: 'Payment Successful',
      description: (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Tow truck request confirmed!</span>
        </div>
      ),
      duration: 5000,
      className: 'bg-green-50 border-green-200',
    })
  } else {
    toast({
      title: 'Payment Error',
      description: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>{error || 'Payment processing error'}</span>
        </div>
      ),
      duration: 5000,
      variant: 'destructive',
    })
  }
}
