import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TowTruckSelectorProps {
  form: UseFormReturn<FormData>;
  onTruckTypeChange: (type: FormData['truckType']) => void;
  onTollFeesChange: (fees: number) => void;
}

export const TowTruckSelector = ({ form, onTruckTypeChange, onTollFeesChange }: TowTruckSelectorProps) => {
  const { toast } = useToast();

  const handleTollFeesChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue < 0) {
      toast({
        title: "Invalid Toll Fee",
        description: "Toll fees cannot be negative",
        variant: "destructive",
      });
      return;
    }
    onTollFeesChange(numValue);
  };

  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-white/95 to-blue-50/95">
      <FormField
        control={form.control}
        name="truckType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Grúa</FormLabel>
            <Select 
              onValueChange={(value: FormData['truckType']) => {
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
                {(Object.entries(towTruckTypes) as [FormData['truckType'], { maxWeight: number }][]).map(([type, details]) => (
                  <SelectItem key={type} value={type}>
                    Tipo {type} (hasta {details.maxWeight}kg)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tollFees"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-primary" />
              Casetas (MXN)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(parseFloat(value) || 0);
                  handleTollFeesChange(value);
                }}
                value={field.value}
                className="bg-white/80"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};