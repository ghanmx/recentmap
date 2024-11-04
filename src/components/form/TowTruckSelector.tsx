import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { Truck } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { getTruckTypeForVehicle } from "@/data/vehicleData";

interface TowTruckSelectorProps {
  form: UseFormReturn<FormData>;
  onTruckTypeChange?: (type: "A" | "B" | "C" | "D") => void;
  onTollFeesChange?: (fees: number) => void;
  selectedModel: string;
}

export const TowTruckSelector = ({ 
  form, 
  onTruckTypeChange, 
  onTollFeesChange, 
  selectedModel 
}: TowTruckSelectorProps) => {
  useEffect(() => {
    if (selectedModel) {
      const recommendedType = getTruckTypeForVehicle(selectedModel);
      form.setValue('truckType', recommendedType);
      onTruckTypeChange?.(recommendedType);
    }
  }, [selectedModel, form, onTruckTypeChange]);

  return (
    <FormField
      control={form.control}
      name="truckType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de Grúa</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                onTruckTypeChange?.(value as "A" | "B" | "C" | "D");
              }}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              {Object.entries(towTruckTypes).map(([key, type]) => (
                <div key={key} className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value={key} id={key} />
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span>Tipo {key} (hasta {type.maxWeight}kg)</span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};