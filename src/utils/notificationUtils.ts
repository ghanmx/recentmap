import { toast } from "@/hooks/use-toast";

const NOTIFICATION_DURATION = 3000;

export const showLocationNotification = (type: 'pickup' | 'drop', coords: { lat: number; lng: number }) => {
  // Solo mostrar una vez por cambio de ubicación
  toast({
    title: `${type === 'pickup' ? 'Punto de recogida' : 'Punto de destino'} establecido`,
    description: `Ubicación: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showRouteNotification = (distance: number) => {
  toast({
    title: "Ruta calculada",
    description: `Distancia total: ${distance.toFixed(2)} km`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
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