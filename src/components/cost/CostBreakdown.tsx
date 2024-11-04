import { Button } from "@/components/ui/button";
import { TowTruckType } from "@/utils/towTruckPricing";
import { formatCurrency } from "@/utils/priceCalculator";

interface CostBreakdownProps {
  baseCost: number;
  tax: number;
  totalDistance: number;
  totalTollCost: number;
  finalCost: number;
  detectedTolls: Array<{ name: string; cost: number }>;
  requiresInvoice: boolean;
  setShowPaymentWindow: (show: boolean) => void;
  maneuverCost: number;
  requiresManeuver: boolean;
  selectedTruck: TowTruckType;
}

export const CostBreakdown = ({
  baseCost,
  tax,
  totalDistance,
  totalTollCost,
  finalCost,
  detectedTolls,
  requiresInvoice,
  setShowPaymentWindow,
  maneuverCost,
  requiresManeuver,
  selectedTruck,
}: CostBreakdownProps) => {
  const renderCostItem = (label: string, amount: number, indent: boolean = false) => (
    <div className={`flex justify-between text-sm text-gray-600 ${indent ? 'pl-4' : ''}`}>
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-lg font-semibold">Desglose de costos:</div>
        <div className="space-y-2 border-t pt-2">
          {renderCostItem(
            `Servicio base (${totalDistance.toFixed(2)} km × ${formatCurrency(selectedTruck.perKm)}/km)`,
            baseCost
          )}
          
          {requiresManeuver && renderCostItem('Cargo por maniobra especial', maneuverCost)}

          {detectedTolls.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm text-gray-600 font-medium">Peajes:</div>
              {detectedTolls.map((toll, index) => (
                renderCostItem(toll.name, toll.cost, true)
              ))}
              {renderCostItem('Total peajes', totalTollCost)}
            </div>
          )}

          {requiresInvoice && renderCostItem('IVA (16%)', tax)}

          <div className="border-t pt-2 text-lg font-bold flex justify-between">
            <span>Total</span>
            <span>{formatCurrency(finalCost)}</span>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => setShowPaymentWindow(true)}
      >
        Proceder al pago
      </Button>
    </div>
  );
};