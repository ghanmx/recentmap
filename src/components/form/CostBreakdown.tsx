import { Card } from "@/components/ui/card";

interface CostBreakdownProps {
  distance: number;
  basePrice: number;
  costPerKm: number;
  maneuverCost: number;
  tollFees: number;
  totalCost: number;
}

export const CostBreakdown = ({
  distance,
  basePrice,
  costPerKm,
  maneuverCost,
  tollFees,
  totalCost
}: CostBreakdownProps) => {
  return (
    <Card className="p-4 bg-blue-50/50 space-y-2">
      <h3 className="font-semibold text-lg">Cost Breakdown</h3>
      <div className="space-y-1 text-sm">
        <p>Distance: {distance.toFixed(2)} km</p>
        <p>Base Price: ${basePrice.toFixed(2)}</p>
        <p>Cost per km: ${costPerKm.toFixed(2)}</p>
        {maneuverCost > 0 && <p>Special Maneuver: ${maneuverCost.toFixed(2)}</p>}
        {tollFees > 0 && <p>Toll Fees: ${tollFees.toFixed(2)}</p>}
        <div className="border-t pt-1 mt-2">
          <p className="font-semibold">Total Cost: ${totalCost.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};