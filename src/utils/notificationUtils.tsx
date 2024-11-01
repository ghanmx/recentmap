import { toast } from "@/hooks/use-toast";
import { Check, AlertTriangle, Info, MapPin } from "lucide-react";
import { ReactNode } from "react";
import { ToastProps } from "@/components/ui/toast";

const NOTIFICATION_COOLDOWN = 3000;
const notificationTimestamps: { [key: string]: number } = {};

const shouldShowNotification = (type: string): boolean => {
  const now = Date.now();
  const lastShown = notificationTimestamps[type] || 0;
  
  if (now - lastShown > NOTIFICATION_COOLDOWN) {
    notificationTimestamps[type] = now;
    return true;
  }
  return false;
};

export const showLocationNotification = (type: 'pickup' | 'drop', coords: { lat: number; lng: number }) => {
  if (!shouldShowNotification(`location_${type}`)) return;
  
  toast({
    title: `${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`,
    description: `Coordinates: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: 3000,
    className: "bg-green-50 border-green-200",
    icon: <MapPin className="h-4 w-4" />
  });
};

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification('route')) return;
  
  toast({
    title: "Route Calculated",
    description: `Total route distance: ${distance.toFixed(2)} km`,
    duration: 3000,
    className: "bg-blue-50 border-blue-200",
    icon: <Info className="h-4 w-4" />
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification('payment')) return;
  
  if (success) {
    toast({
      title: "Payment Successful",
      description: "Tow truck request confirmed!",
      duration: 4000,
      className: "bg-green-50 border-green-200",
      icon: <Check className="h-4 w-4" className="text-green-700" />
    });
  } else {
    toast({
      title: "Payment Error",
      description: error || "Payment processing error",
      duration: 5000,
      variant: "destructive",
      icon: <AlertTriangle className="h-4 w-4" className="text-red-700" />
    });
  }
};