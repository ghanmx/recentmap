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
    <div className="bg-white/95 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Car className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Vehicle Information</h2>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="vehicleYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Year</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white/50 border-gray-200 hover:bg-white/80 transition-colors">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                  position="popper" 
                  className="z-[1100]"
                  align="start"
                >
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
            <FormItem>
              <FormLabel className="text-gray-700">Brand</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedBrand(value);
                  form.setValue('vehicleModel', '');
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white/50 border-gray-200 hover:bg-white/80 transition-colors">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                  position="popper" 
                  className="z-[1100]"
                  align="start"
                >
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
            <FormItem>
              <FormLabel className="text-gray-700">Model</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onVehicleModelChange?.(value);
                }}
                value={field.value}
                disabled={!selectedBrand}
              >
                <FormControl>
                  <SelectTrigger 
                    className={`bg-white/50 border-gray-200 hover:bg-white/80 transition-colors
                              ${!selectedBrand && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <SelectValue 
                      placeholder={selectedBrand ? "Select model" : "Select brand first"} 
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                  position="popper" 
                  className="z-[1100]"
                  align="start"
                >
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