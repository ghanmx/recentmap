import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CostMetricsProps {
  totalDistance: number;
  requiresInvoice: boolean;
  setRequiresInvoice: (value: boolean) => void;
}

export const CostMetrics = ({
  totalDistance,
  requiresInvoice,
  setRequiresInvoice
}: CostMetricsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Distancia total:</span>
        <span>{totalDistance.toFixed(2)} km</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Label htmlFor="invoice-required">Requiere factura (+16% IVA)</Label>
        <Switch
          id="invoice-required"
          checked={requiresInvoice}
          onCheckedChange={setRequiresInvoice}
        />
      </div>
    </div>
  );
};