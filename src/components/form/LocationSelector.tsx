import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { LocationSearch } from "./LocationSearch";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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

  // Sincronizar direcciones con el formulario
  useEffect(() => {
    if (pickupAddress) {
      form.setValue('pickupLocation', {
        lat: pickupLocation?.lat || 0,
        lng: pickupLocation?.lng || 0,
        address: pickupAddress
      });
    }
  }, [pickupAddress, pickupLocation, form]);

  useEffect(() => {
    if (dropAddress) {
      form.setValue('dropoffLocation', {
        lat: dropLocation?.lat || 0,
        lng: dropLocation?.lng || 0,
        address: dropAddress
      });
    }
  }, [dropAddress, dropLocation, form]);

  const handleLocationSelect = async (location: { lat: number; lng: number; address: string }, type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      form.setValue('pickupLocation', location);
      onPickupSelect?.(location);
      onSelectingPickup?.(false);
    } else {
      form.setValue('dropoffLocation', location);
      onDropSelect?.(location);
      onSelectingDrop?.(false);
    }

    toast({
      title: type === 'pickup' ? "Ubicación de recogida actualizada" : "Ubicación de entrega actualizada",
      description: location.address,
    });
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
                type="pickup"
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
                icon={<Navigation className="h-4 w-4 text-primary" />}
                currentAddress={dropAddress}
                currentLocation={dropLocation}
                onLocationSelect={(location) => handleLocationSelect(location, 'drop')}
                type="drop"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};