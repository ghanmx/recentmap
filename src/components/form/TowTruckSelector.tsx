import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Coins, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTruckTypeForVehicle } from "@/data/vehicleData";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TowTruckSelectorProps {
  form: UseFormReturn<FormData>;
  onTruckTypeChange: (type: FormData['truckType']) => void;
  onTollFeesChange: (fees: number) => void;
  selectedModel: string;
}

export const TowTruckSelector = ({ 
  form, 
  onTruckTypeChange, 
  onTollFeesChange,
  selectedModel 
}: TowTruckSelectorProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (selectedModel) {
      const recommendedType = getTruckTypeForVehicle(selectedModel);
      form.setValue('truckType', recommendedType);
      onTruckTypeChange(recommendedType);
      
      toast({
        title: "Tipo de Grúa Recomendado",
        description: `Se ha seleccionado la grúa tipo ${recommendedType} basado en el modelo ${selectedModel}.`,
        variant: "default"
      });
    }
  }, [selectedModel, form, onTruckTypeChange]);

  const handleTollFeesChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue < 0) {
      toast({
        title: "Tarifa de Peaje Inválida",
        description: "Las tarifas de peaje no pueden ser negativas",
        variant: "destructive",
      });
      return;
    }
    form.setValue('tollFees', numValue);
    onTollFeesChange(numValue);
  };

  const selectedTruckType = form.watch('truckType');

  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-white/95 to-blue-50/95">
      <FormField
        control={form.control}
        name="truckType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              Tipo de Grúa
            </FormLabel>
            <Select 
              onValueChange={(value: FormData['truckType']) => {
                field.onChange(value);
                onTruckTypeChange(value);
              }}
              value={field.value}
              disabled={!!selectedModel}
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
            {selectedTruckType && (
              <FormDescription className="mt-2">
                <Alert variant="default" className="bg-primary/5 border-primary/20">
                  <AlertDescription>
                    La grúa tipo {selectedTruckType} puede manejar vehículos de hasta {towTruckTypes[selectedTruckType].maxWeight}kg.
                    {selectedModel && ` Recomendada para ${selectedModel}.`}
                  </AlertDescription>
                </Alert>
              </FormDescription>
            )}
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