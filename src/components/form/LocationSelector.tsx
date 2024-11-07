import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { LocationSearch } from "./LocationSearch";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface LocationSelectorProps {
  form: UseFormReturn<FormData>;
  pickupLocation?: { lat: number; lng: number } | null;
  dropLocation?: { lat: number; lng: number } | null;
  pickupAddress?: string;
  dropAddress?: string;
  onPickupSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onSelectingPickup?: (selecting: boolean) => void;
  onSelectingDrop?: (selecting: boolean) => void;
}

export const LocationSelector = ({ 
  form,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop
}: LocationSelectorProps) => {
  const { toast } = useToast();

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }, type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      form.setValue('pickupLocation', location);
      onPickupSelect?.(location);
      toast({
        title: "Ubicación de recogida actualizada",
        description: location.address,
      });
    } else {
      form.setValue('dropoffLocation', location);
      onDropSelect?.(location);
      toast({
        title: "Ubicación de entrega actualizada",
        description: location.address,
      });
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="pickupLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">Ubicación de Recogida</FormLabel>
            <FormControl>
              <LocationSearch
                label="Ubicación de Recogida"
                placeholder="Ingrese dirección de recogida..."
                icon={<MapPin className="h-4 w-4 text-primary" />}
                currentAddress={pickupAddress}
                currentLocation={pickupLocation}
                onLocationSelect={(location) => handleLocationSelect(location, 'pickup')}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dropoffLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">Ubicación de Entrega</FormLabel>
            <FormControl>
              <LocationSearch
                label="Ubicación de Entrega"
                placeholder="Ingrese dirección de entrega..."
                icon={<MapPin className="h-4 w-4 text-primary" />}
                currentAddress={dropAddress}
                currentLocation={dropLocation}
                onLocationSelect={(location) => handleLocationSelect(location, 'drop')}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};