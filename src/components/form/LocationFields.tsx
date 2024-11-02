import { LocationSearch } from "./LocationSearch";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationFieldsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export const LocationFields = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect
}: LocationFieldsProps) => {
  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-white/95 to-blue-50/95">
      <div className="space-y-4">
        <div className="relative">
          <LocationSearch
            label="Ubicación de recogida"
            placeholder="Ingrese la dirección de recogida"
            currentAddress={pickupAddress}
            onLocationSelect={onPickupSelect}
          />
          {pickupLocation && (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Lat: {pickupLocation.lat.toFixed(6)}, Lng: {pickupLocation.lng.toFixed(6)}</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <LocationSearch
            label="Ubicación de entrega"
            placeholder="Ingrese la dirección de entrega"
            currentAddress={dropAddress}
            onLocationSelect={onDropSelect}
          />
          {dropLocation && (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Lat: {dropLocation.lat.toFixed(6)}, Lng: {dropLocation.lng.toFixed(6)}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};