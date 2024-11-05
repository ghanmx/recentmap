import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { FileText, Truck } from "lucide-react";

interface CostMetricsProps {
  totalDistance: number;
  requiresInvoice: boolean;
  setRequiresInvoice: (value: boolean) => void;
  requiresManeuver: boolean;
  onManeuverChange: (checked: boolean) => void;
}

export const CostMetrics = ({
  totalDistance,
  requiresInvoice,
  setRequiresInvoice,
  requiresManeuver,
  onManeuverChange
}: CostMetricsProps) => {
  return (
    <Card className="p-4 space-y-4 bg-white/50">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">Distancia total:</span>
        <span className="font-semibold">{totalDistance.toFixed(2)} km</span>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-primary" />
          <Label htmlFor="invoice-required">Requiere factura (+16% IVA)</Label>
        </div>
        <Switch
          id="invoice-required"
          checked={requiresInvoice}
          onCheckedChange={setRequiresInvoice}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-primary" />
          <Label htmlFor="maneuver-required">Requiere maniobra especial</Label>
        </div>
        <Switch
          id="maneuver-required"
          checked={requiresManeuver}
          onCheckedChange={onManeuverChange}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </Card>
  );
};