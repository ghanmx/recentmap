import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { useState } from "react";

interface VehicleDetailsFormData {
  year: string;
  brand: string;
  model: string;
}

export const VehicleDetails = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const form = useForm<VehicleDetailsFormData>();
  
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    form.setValue('model', ''); // Reset model when brand changes
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  {...field}
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleBrandChange(e);
                  }}
                >
                  <option value="">Select brand</option>
                  {vehicleBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  {...field}
                  disabled={!selectedBrand}
                >
                  <option value="">Select model</option>
                  {selectedBrand && vehicleModels[selectedBrand]?.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};