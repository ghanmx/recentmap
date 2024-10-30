import { LocationSearch } from "./LocationSearch";

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
    <div className="space-y-4">
      <LocationSearch
        label="Ubicación de recogida"
        placeholder="Ingrese la dirección de recogida"
        currentAddress={pickupAddress}
        onLocationSelect={onPickupSelect}
      />
      
      <LocationSearch
        label="Ubicación de entrega"
        placeholder="Ingrese la dirección de entrega"
        currentAddress={dropAddress}
        onLocationSelect={onDropSelect}
      />
    </div>
  );
};