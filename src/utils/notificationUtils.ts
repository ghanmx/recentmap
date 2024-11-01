import { toast } from "@/hooks/use-toast";
import { Check, AlertTriangle, Info, MapPin } from "lucide-react";
import { ReactNode } from "react";

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
  
  const title: ReactNode = (
    <div className="flex items-center gap-2">
      <MapPin className="h-4 w-4" />
      {`${type === 'pickup' ? 'Pickup' : 'Drop-off'} Location Set`}
    </div>
  );

  toast({
    title,
    description: `Coordinates: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
    duration: 3000,
    className: "bg-green-50 border-green-200"
  });
};

export const showRouteNotification = (distance: number) => {
  if (!shouldShowNotification('route')) return;
  
  const title: ReactNode = (
    <div className="flex items-center gap-2">
      <Info className="h-4 w-4" />
      Route Calculated
    </div>
  );

  toast({
    title,
    description: `Total route distance: ${distance.toFixed(2)} km`,
    duration: 3000,
    className: "bg-blue-50 border-blue-200"
  });
};

export const showPaymentNotification = (success: boolean, error?: string) => {
  if (!shouldShowNotification('payment')) return;
  
  if (success) {
    const successTitle: ReactNode = (
      <div className="flex items-center gap-2 text-green-700">
        <Check className="h-4 w-4" />
        Payment Successful
      </div>
    );

    toast({
      title: successTitle,
      description: "Tow truck request confirmed!",
      duration: 4000,
      className: "bg-green-50 border-green-200"
    });
  } else {
    const errorTitle: ReactNode = (
      <div className="flex items-center gap-2 text-red-700">
        <AlertTriangle className="h-4 w-4" />
        Payment Error
      </div>
    );

    toast({
      title: errorTitle,
      description: error || "Payment processing error",
      duration: 5000,
      variant: "destructive"
    });
  }
};