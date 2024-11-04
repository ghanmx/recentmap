import { LocationSearch } from "./LocationSearch";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface AddressFieldsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
  onTollUpdate?: (tollCost: number) => void;
  onSelectingPickup: (selecting: boolean) => void;
  onSelectingDrop: (selecting: boolean) => void;
  className?: string;
}

export const AddressFields = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onTollUpdate,
  onSelectingPickup,
  onSelectingDrop,
  className = ""
}: AddressFieldsProps) => {
  return (
    <Card className={`p-6 space-y-6 bg-gradient-to-br from-white/95 to-blue-50/95 border-blue-100 ${className}`}>
      <div className="space-y-6">
        <div className="relative">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-lg text-gray-800">Pickup Location</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectingPickup(true)}
              className="text-sm hover:bg-green-50"
            >
              <MapPin className="h-4 w-4 mr-2 text-green-500" />
              Seleccionar en Mapa
            </Button>
          </div>
          <LocationSearch
            label=""
            placeholder="Enter pickup address"
            currentAddress={pickupAddress}
            currentLocation={pickupLocation}
            onLocationSelect={(loc) => onPickupSelect(loc)}
            icon={<MapPin className="h-4 w-4 text-green-500" />}
          />
          {pickupLocation && (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1.5 bg-gray-50 p-2 rounded-md">
              <MapPin className="h-3 w-3" />
              <span className="font-mono">
                {pickupLocation.lat.toFixed(6)}, {pickupLocation.lng.toFixed(6)}
              </span>
            </div>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <div className="relative">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-lg text-gray-800">Drop-off Location</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectingDrop(true)}
              className="text-sm hover:bg-red-50"
            >
              <Navigation className="h-4 w-4 mr-2 text-red-500" />
              Seleccionar en Mapa
            </Button>
          </div>
          <LocationSearch
            label=""
            placeholder="Enter drop-off address"
            currentAddress={dropAddress}
            currentLocation={dropLocation}
            onLocationSelect={(loc) => onDropSelect(loc)}
            icon={<Navigation className="h-4 w-4 text-red-500" />}
          />
          {dropLocation && (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1.5 bg-gray-50 p-2 rounded-md">
              <Navigation className="h-3 w-3" />
              <span className="font-mono">
                {dropLocation.lat.toFixed(6)}, {dropLocation.lng.toFixed(6)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};