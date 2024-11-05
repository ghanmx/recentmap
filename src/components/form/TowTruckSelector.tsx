import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { towTruckTypes, getTruckTypeForVehicle } from "@/utils/towTruckPricing";
import { Truck, AlertTriangle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { motion } from "framer-motion";

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
      console.log('[TowTruckSelector] Selected model:', selectedModel);
      console.log('[TowTruckSelector] Recommended truck type:', recommendedType);
      form.setValue('truckType', recommendedType);
      onTruckTypeChange?.(recommendedType);
    }
  }, [selectedModel, form, onTruckTypeChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="truckType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Tipo de Grúa
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  onTruckTypeChange?.(value as "A" | "B" | "C" | "D");
                }}
                value={field.value}
                className="flex flex-col space-y-3"
              >
                {Object.entries(towTruckTypes).map(([key, type]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: Number(key.charCodeAt(0) - 65) * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <RadioGroupItem value={key} id={key} className="border-primary" />
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        Tipo {key} (hasta {type.maxWeight.toLocaleString()}kg)
                      </span>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex items-center gap-2 p-3 bg-yellow-50/50 rounded-lg text-sm text-yellow-700">
        <AlertTriangle className="w-4 h-4" />
        <p>El tipo de grúa se recomienda según el modelo del vehículo seleccionado</p>
      </div>
    </motion.div>
  );
};