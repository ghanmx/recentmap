import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { Truck } from "lucide-react";

export const TowTruckSelector = ({ form, onTruckTypeChange, selectedModel }: any) => {
  useEffect(() => {
    // Determine truck type based on vehicle model
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
    <FormField name="truckType">
      <FormItem>
        <FormLabel>Tipo de Camión</FormLabel>
        <FormControl>
          <RadioGroup defaultValue={form.getValues('truckType')}>
            {Object.entries(towTruckTypes).map(([key, type]) => (
              <RadioGroupItem key={key} value={key} id={key}>
                <Truck className="w-5 h-5" />
                {type.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </FormControl>
      </FormItem>
    </FormField>
  );
};
