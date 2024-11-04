import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Car, Palette, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

type FormFields = {
  year: string;
  brand: string;
  model: string;
  color: string;
};

export const VehicleDetails = ({ 
  onBrandChange,
  onModelChange,
  onYearChange,
  onColorChange 
}: VehicleDetailsProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const form = useForm<FormFields>();
  
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    form.setValue('model', '');
    onBrandChange?.(brand);
  };

  const SelectField = ({ 
    icon: Icon, 
    label, 
    name, 
    options, 
    onChange, 
    disabled = false,
    value = ""
  }: {
    icon: any;
    label: string;
    name: keyof FormFields;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    value?: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
            <Icon className="h-4 w-4 text-primary/80" />
            {label}
          </FormLabel>
          <FormControl>
            <select 
              className={cn(
                "w-full p-3 border rounded-lg bg-white/95",
                "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "transition-all duration-200 ease-in-out",
                "text-gray-700 font-medium",
                "hover:border-primary/50",
                disabled && "bg-gray-50/95 cursor-not-allowed opacity-75"
              )}
              {...field}
              onChange={onChange}
              disabled={disabled}
              value={value || field.value}
            >
              <option value="" className="text-gray-500">
                {`Select ${label.toLowerCase()}`}
              </option>
              {options.map((option) => (
                <option 
                  key={option} 
                  value={option}
                  className="text-gray-700"
                >
                  {option}
                </option>
              ))}
            </select>
          </FormControl>
        </FormItem>
      )}
    />
  );

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-white/95 via-blue-50/95 to-white/95 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Vehicle Details</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80 hover:bg-primary/10"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <SelectField
            icon={Calendar}
            label="Year"
            name="year"
            options={years}
            onChange={(e) => {
              form.setValue('year', e.target.value);
              onYearChange?.(e.target.value);
            }}
          />

          <SelectField
            icon={Car}
            label="Brand"
            name="brand"
            options={vehicleBrands}
            onChange={handleBrandChange}
          />

          <SelectField
            icon={Tag}
            label="Model"
            name="model"
            options={selectedBrand ? vehicleModels[selectedBrand] || [] : []}
            onChange={(e) => {
              form.setValue('model', e.target.value);
              onModelChange?.(e.target.value);
            }}
            disabled={!selectedBrand}
          />

          <SelectField
            icon={Palette}
            label="Color"
            name="color"
            options={commonColors}
            onChange={(e) => {
              form.setValue('color', e.target.value);
              onColorChange?.(e.target.value);
            }}
          />
        </form>
      </Form>
    </Card>
  );
};
