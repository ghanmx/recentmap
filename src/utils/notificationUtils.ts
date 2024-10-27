import { toast } from "@/hooks/use-toast";

const NOTIFICATION_DURATION = 3000;
let lastNotificationTimestamp = 0;
const NOTIFICATION_COOLDOWN = 1000; // Minimum time between notifications (1 second)

const shouldShowNotification = () => {
  const now = Date.now();
  if (now - lastNotificationTimestamp > NOTIFICATION_COOLDOWN) {
    lastNotificationTimestamp = now;
    return true;
  }
  return false;
};

export const showLocationNotification = (type: 'pickup' | 'drop', coords: { lat: number; lng: number }) => {
  if (!shouldShowNotification()) return;
  
  toast({
    title: `${type === 'pickup' ? 'Punto de recogida' : 'Punto de destino'} establecido`,
    description: `Ubicación: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification()) return;

  toast({
    title: "Ruta calculada",
    description: `Distancia total: ${distance.toFixed(2)} km`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification()) return;

  if (success) {
    toast({
      title: "Pago exitoso",
      description: "¡Tu solicitud de grúa ha sido confirmada!",
      duration: NOTIFICATION_DURATION,
    });
  } else {
    toast({
      title: "Error en el pago",
      description: error || "Hubo un error al procesar tu pago",
      duration: NOTIFICATION_DURATION,
      variant: "destructive",
    });
  }
};