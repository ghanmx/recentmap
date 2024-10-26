import { toast } from "@/hooks/use-toast";

export const showLocationNotification = (type: 'pickup' | 'drop', coords: { lat: number; lng: number }) => {
  toast({
    title: `${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`,
    description: `Location set to: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
  });
};

export const showRouteNotification = (distance: number) => {
  toast({
    title: "Route Calculated",
    description: `Total distance: ${distance.toFixed(2)} km`,
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (success) {
    toast({
      title: "Payment Successful",
      description: "Your tow truck request has been confirmed!",
    });
  } else {
    toast({
      title: "Payment Failed",
      description: error || "There was an error processing your payment",
      variant: "destructive",
    });
  }
};