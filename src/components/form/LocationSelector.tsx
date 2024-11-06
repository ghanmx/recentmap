import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { LocationSearch } from "../form/LocationSearch";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  form: UseFormReturn<FormData>;
}

export const LocationSelector = ({ form }: LocationSelectorProps) => {
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
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};