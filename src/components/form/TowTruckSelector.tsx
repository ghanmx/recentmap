import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { TowTruckType } from "@/utils/downloadUtils";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/service";

interface TowTruckSelectorProps {
  form: UseFormReturn<FormData>;
  onTruckTypeChange: (type: TowTruckType) => void;
  onTollFeesChange: (fees: number) => void;
}

export const TowTruckSelector = ({ form, onTruckTypeChange, onTollFeesChange }: TowTruckSelectorProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="truckType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Grúa</FormLabel>
            <Select 
              onValueChange={(value: TowTruckType) => {
                field.onChange(value);
                onTruckTypeChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo de grúa" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(towTruckTypes).map(([type, details]) => (
                  <SelectItem key={type} value={type as TowTruckType}>
                    Tipo {type} (hasta {details.maxWeight}kg)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tollFees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Casetas (MXN)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                  onTollFeesChange(value);
                }}
                value={field.value}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};