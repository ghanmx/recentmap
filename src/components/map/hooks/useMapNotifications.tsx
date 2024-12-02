import { useToast } from '@/hooks/use-toast'

export const useMapNotifications = () => {
  const { toast } = useToast()

  const showLocationSelectionNotification = (type: 'pickup' | 'drop'): void => {
    toast({
      title: type === 'pickup' ? 'Seleccionando punto de recogida' : 'Seleccionando punto de entrega',
      description: `Haz clic en el mapa para seleccionar el punto de ${type === 'pickup' ? 'recogida' : 'entrega'}`,
      className: type === 'pickup' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200',
    })
  }

  const showRouteCalculationError = (error: string): void => {
    toast({
      title: 'Error al calcular la ruta',
      description: error,
      variant: 'destructive',
    })
  }

  const showLocationUpdateSuccess = (type: 'pickup' | 'drop', address: string): void => {
    toast({
      title: `${type === 'pickup' ? 'Punto de recogida' : 'Punto de entrega'} actualizado`,
      description: address,
      className: type === 'pickup' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200',
    })
  }

  return {
    showLocationSelectionNotification,
    showRouteCalculationError,
    showLocationUpdateSuccess,
  }
}