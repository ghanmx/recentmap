import { toast } from "@/hooks/use-toast";

const NOTIFICATION_DURATION = 3000; // 3 seconds

export const showLocationNotification = (type: 'pickup' | 'drop', coords: { lat: number; lng: number }) => {
  toast({
    title: `${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`,
    description: `Location set to: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showRouteNotification = (distance: number) => {
  toast({
    title: "Route Calculated",
    description: `Total distance: ${distance.toFixed(2)} km`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (success) {
    toast({
      title: "Payment Successful",
      description: "Your tow truck request has been confirmed!",
      duration: NOTIFICATION_DURATION,
      variant: "default",
      className: "bg-green-50 border-green-200",
    });
  } else {
    toast({
      title: "Payment Failed",
      description: error || "There was an error processing your payment",
      duration: NOTIFICATION_DURATION,
      variant: "destructive",
    });
  }
};

export const clearAllNotifications = () => {
  // This function can be used to programmatically clear all notifications
  document.querySelectorAll('[role="status"]').forEach(el => el.remove());
};