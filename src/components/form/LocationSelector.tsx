import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { LocationSearch } from "../form/LocationSearch";
import { MapPin } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="pickupLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">Pickup Location</FormLabel>
            <FormControl>
              <LocationSearch
                label="Pickup Location"
                placeholder="Enter pickup address..."
                icon={<MapPin className="h-4 w-4 text-primary" />}
                onLocationSelect={(location) => {
                  field.onChange(location);
                  onPickupSelect?.(location);
                }}
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
            <FormLabel className="text-lg font-semibold">Drop-off Location</FormLabel>
            <FormControl>
              <LocationSearch
                label="Drop-off Location"
                placeholder="Enter drop-off address..."
                icon={<MapPin className="h-4 w-4 text-primary" />}
                onLocationSelect={(location) => {
                  field.onChange(location);
                  onDropSelect?.(location);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};