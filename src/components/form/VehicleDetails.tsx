import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { Car } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

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
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <Car className="w-5 h-5 text-primary animate-pulse" />
        <h2>Vehicle Details</h2>
      </div>

      <FormField
        control={form.control}
        name="vehicleMake"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedBrand(value);
              }}
            >
              <FormControl>
                <SelectTrigger className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
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
            <FormLabel>Model</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onVehicleModelChange?.(value);
              }}
            >
              <FormControl>
                <SelectTrigger className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedBrand && vehicleModels[selectedBrand]?.map((model) => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vehicleYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="e.g., 2020"
                className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};