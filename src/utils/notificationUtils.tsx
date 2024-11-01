import { toast } from "@/hooks/use-toast";
import { Check, AlertTriangle, Info, MapPin } from "lucide-react";

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
    title: (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        {`${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`}
      </div>
    ),
    description: `Coordinates: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: 3000,
    className: "bg-green-50 border-green-200"
  });
};

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification('route')) return;
  
  toast({
    title: (
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        Route Calculated
      </div>
    ),
    description: `Total route distance: ${distance.toFixed(2)} km`,
    duration: 3000,
    className: "bg-blue-50 border-blue-200"
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification('payment')) return;
  
  if (success) {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Payment Successful
        </div>
      ),
      description: "Tow truck request confirmed!",
      duration: 4000,
      className: "bg-green-50 border-green-200"
    });
  } else {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Payment Error
        </div>
      ),
      description: error || "Payment processing error",
      duration: 5000,
      variant: "destructive"
    });
  }
};