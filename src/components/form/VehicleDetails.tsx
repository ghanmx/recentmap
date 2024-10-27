import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { Car } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface VehicleDetailsProps {
  form: UseFormReturn<any>;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  onVehicleModelChange?: (model: string) => void;
}

export const VehicleDetails = ({ 
  form, 
  selectedBrand, 
  setSelectedBrand, 
  onVehicleModelChange 
}: VehicleDetailsProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 50 },
    (_, i) => (currentYear - i).toString()
  );

  return (
    <div className="space-y-6 bg-white/90 rounded-lg p-6 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-4">
        <Car className="w-5 h-5 text-primary animate-pulse" />
        <h2>Vehicle Information</h2>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="vehicleYear"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Year</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleMake"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Brand</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedBrand(value);
                  form.setValue('vehicleModel', '');
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {vehicleBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleModel"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Model</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onVehicleModelChange?.(value);
                }}
                value={field.value}
                disabled={!selectedBrand}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue 
                      placeholder={selectedBrand ? "Select model" : "Select brand first"} 
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {selectedBrand && vehicleModels[selectedBrand]?.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};