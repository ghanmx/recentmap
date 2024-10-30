import { toast } from "@/hooks/use-toast";

const NOTIFICATION_COOLDOWN = 1000;
let lastNotificationTimestamp = 0;

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
    duration: 3000,
  });
};

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification()) return;
  toast({
    title: "Route Calculated",
    description: `Total route distance: ${distance.toFixed(2)} km`,
    duration: 3000,
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification()) return;
  toast({
    title: success ? "Payment Successful" : "Payment Error",
    description: success ? "Tow truck request confirmed!" : error || "Payment processing error",
    duration: 3000,
    variant: success ? "default" : "destructive",
  });
};