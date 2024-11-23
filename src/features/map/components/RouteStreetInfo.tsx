import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import Draggable from "react-draggable";
import { useRef } from "react";

interface RouteStreetInfoProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress?: string;
  dropAddress?: string;
  isLoading?: boolean;
}

export const RouteStreetInfo = ({ 
  pickupLocation, 
  dropLocation,
  pickupAddress,
  dropAddress,
  isLoading = false
}: RouteStreetInfoProps) => {
  const nodeRef = useRef(null);

  if (!pickupLocation && !dropLocation) return null;

  return (
    <Draggable
      handle=".drag-handle"
      bounds="parent"
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="absolute z-[1000] max-w-md">
        <Card className="p-4 space-y-3 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl border-blue-100/50">
          <div className="flex items-center justify-between border-b pb-2 mb-2 drag-handle cursor-move">
            <div className="font-semibold text-sm text-primary/90">Detalles de Ubicación</div>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
          </div>
          
          {pickupLocation && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm">Punto de Recogida</div>
                <div className="text-sm text-gray-600 break-words">
                  {pickupAddress || "Cargando dirección..."}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Coordenadas: {pickupLocation.lat.toFixed(6)}, {pickupLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}
          
          {dropLocation && (
            <div className="flex items-start gap-2">
              <Navigation className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm">Punto de Entrega</div>
                <div className="text-sm text-gray-600 break-words">
                  {dropAddress || "Cargando dirección..."}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Coordenadas: {dropLocation.lat.toFixed(6)}, {dropLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Draggable>
  );
};