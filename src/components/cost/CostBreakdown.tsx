import { Button } from "@/components/ui/button";
import { TowTruckType } from "@/utils/towTruckPricing";
import { formatCurrency } from "@/utils/priceCalculator";
import { Card } from "@/components/ui/card";
import { Receipt, Truck, TrendingUp, Flag } from "lucide-react";

interface CostBreakdownProps {
  baseCost: number;
  flagDropFee: number;
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
  subtotal: number;
}

export const CostBreakdown = ({
  baseCost,
  flagDropFee,
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
  subtotal,
}: CostBreakdownProps) => {
  const renderCostItem = (label: string, amount: number, icon?: React.ReactNode, indent: boolean = false) => (
    <div className={`flex justify-between items-center text-sm text-gray-600 ${indent ? 'pl-4' : ''}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{formatCurrency(amount)}</span>
    </div>
  );

  return (
    <Card className="p-4 space-y-4 bg-white/50">
      <div className="space-y-2">
        <div className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          <span>{selectedTruck.name} - {selectedTruck.capacity}</span>
        </div>
        
        <div className="space-y-3 border-t pt-3">
          {renderCostItem(
            'Banderazo',
            flagDropFee,
            <Flag className="w-4 h-4 text-primary" />
          )}

          {renderCostItem(
            `Servicio base (${totalDistance.toFixed(2)} km × ${formatCurrency(selectedTruck.perKm)}/km)`,
            baseCost,
            <TrendingUp className="w-4 h-4 text-primary" />
          )}
          
          {requiresManeuver && renderCostItem(
            'Cargo por maniobra especial',
            maneuverCost,
            <Truck className="w-4 h-4 text-orange-500" />
          )}

          {detectedTolls.length > 0 && (
            <>
              <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
                <Receipt className="w-4 h-4 text-primary" />
                Peajes:
              </div>
              {detectedTolls.map((toll, index) => (
                renderCostItem(toll.name, toll.cost, undefined, true)
              ))}
              {renderCostItem('Total peajes', totalTollCost)}
            </>
          )}

          <div className="border-t pt-2 mt-2">
            {renderCostItem('Subtotal', subtotal)}
            
            {requiresInvoice && renderCostItem(
              'IVA (16%)',
              tax,
              <Receipt className="w-4 h-4 text-green-500" />
            )}
          </div>

          <div className="border-t pt-3 text-lg font-bold flex justify-between items-center">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(finalCost)}</span>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        onClick={() => setShowPaymentWindow(true)}
      >
        Proceder al pago
      </Button>
    </Card>
  );
};