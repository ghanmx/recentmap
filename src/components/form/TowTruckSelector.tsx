import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { Truck } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";

interface TowTruckSelectorProps {
  form: UseFormReturn<FormData>;
  onTruckTypeChange?: (type: "A" | "B" | "C" | "D") => void;
  onTollFeesChange?: (fees: number) => void;
  selectedModel: string;
}

export const TowTruckSelector = ({ form, onTruckTypeChange, onTollFeesChange, selectedModel }: TowTruckSelectorProps) => {
  useEffect(() => {
    const determineType = () => {
      const model = selectedModel.toLowerCase();
      if (model.includes('pickup') || model.includes('suv') || model.includes('camioneta')) {
        return 'C';
      }
      if (model.includes('van') || model.includes('minivan')) {
        return 'B';
      }
      return 'A';
    };

    const recommendedType = determineType();
    form.setValue('truckType', recommendedType);
    onTruckTypeChange?.(recommendedType);
  }, [selectedModel, form, onTruckTypeChange]);

  return (
    <FormField
      control={form.control}
      name="truckType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de Camión</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
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