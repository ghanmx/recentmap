import { MapPin } from "lucide-react";

interface LocationPanelsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
}

export const LocationPanels = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
}: LocationPanelsProps) => {
  if (!pickupAddress && !dropAddress) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-sm 
                    shadow-xl border border-gray-200/50 rounded-xl p-4 space-y-3 lg:hidden">
      {pickupAddress && (
        <div className="space-y-2 p-2 bg-blue-50/50 rounded-lg">
          <div className="font-semibold text-xs text-primary flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Punto de Recogida
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">{pickupAddress}</p>
        </div>
      )}
      {dropAddress && (
        <div className="space-y-2 p-2 bg-green-50/50 rounded-lg">
          <div className="font-semibold text-xs text-secondary flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Punto de Entrega
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">{dropAddress}</p>
        </div>
      )}
    </div>
  );
};