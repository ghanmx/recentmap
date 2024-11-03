import { LocationSearch } from "./LocationSearch";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddressFieldsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
  onTollUpdate: (tollCost: number) => void;
}

export const AddressFields = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onTollUpdate
}: AddressFieldsProps) => {
  const { toast } = useToast();

  const handleLocationSelect = async (type: 'pickup' | 'drop', location: { lat: number; lng: number; address: string }) => {
    if (type === 'pickup') {
      onPickupSelect(location);
      toast({
        title: "Pickup Location Set",
        description: location.address,
      });
    } else {
      onDropSelect(location);
      toast({
        title: "Drop-off Location Set",
        description: location.address,
      });
    }
  };

  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-white/95 to-blue-50/95">
      <div className="space-y-4">
        <div className="relative">
          <LocationSearch
            label="Pickup Location"
            placeholder="Enter pickup address"
            currentAddress={pickupAddress}
            currentLocation={pickupLocation}
            onLocationSelect={(loc) => handleLocationSelect('pickup', loc)}
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
            label="Drop-off Location"
            placeholder="Enter drop-off address"
            currentAddress={dropAddress}
            currentLocation={dropLocation}
            onLocationSelect={(loc) => handleLocationSelect('drop', loc)}
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