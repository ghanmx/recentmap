import { toast } from "@/hooks/use-toast";

const NOTIFICATION_DURATION = 3000;
let lastNotificationTimestamp = 0;
const NOTIFICATION_COOLDOWN = 1000;

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
    title: `${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`,
    description: `Location: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification()) return;

  toast({
    title: "Route Calculated",
    description: `Total route distance (including return): ${distance.toFixed(2)} km`,
    duration: NOTIFICATION_DURATION,
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification()) return;

  if (success) {
    toast({
      title: "Payment Successful",
      description: "Your tow truck request has been confirmed!",
      duration: NOTIFICATION_DURATION,
    });
  } else {
    toast({
      title: "Payment Error",
      description: error || "There was an error processing your payment",
      duration: NOTIFICATION_DURATION,
      variant: "destructive",
    });
  }
};