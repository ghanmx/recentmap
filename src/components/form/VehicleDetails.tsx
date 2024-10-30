import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { useState } from "react";

interface VehicleDetailsProps {
  onBrandChange?: (brand: string) => void;
  onModelChange?: (model: string) => void;
  onYearChange?: (year: string) => void;
  onColorChange?: (color: string) => void;
}

const commonColors = [
  "Black", "White", "Silver", "Gray", "Red", "Blue", 
  "Green", "Yellow", "Brown", "Gold", "Orange", "Purple"
];

export const VehicleDetails = ({ 
  onBrandChange,
  onModelChange,
  onYearChange,
  onColorChange 
}: VehicleDetailsProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const form = useForm<{
    year: string;
    brand: string;
    model: string;
    color: string;
  }>();
  
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    form.setValue('model', '');
    onBrandChange?.(brand);
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
                  onChange={(e) => {
                    field.onChange(e);
                    onYearChange?.(e.target.value);
                  }}
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
                  onChange={(e) => {
                    field.onChange(e);
                    onModelChange?.(e.target.value);
                  }}
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

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onColorChange?.(e.target.value);
                  }}
                >
                  <option value="">Select color</option>
                  {commonColors.map((color) => (
                    <option key={color} value={color}>{color}</option>
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