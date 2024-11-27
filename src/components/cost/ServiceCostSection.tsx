import { TowTruckType } from "@/utils/towTruckPricing";
import { CostItemDisplay } from "./CostItemDisplay";
import { Flag, TrendingUp, Truck } from "lucide-react";
import { formatCurrency } from "@/utils/priceCalculator";

interface ServiceCostSectionProps {
  flagDropFee: number;
  baseCost: number;
  totalDistance: number;
  selectedTruck: TowTruckType;
  maneuverCost: number;
  requiresManeuver: boolean;
}

export const ServiceCostSection = ({
  flagDropFee,
  baseCost,
  totalDistance,
  selectedTruck,
  maneuverCost,
  requiresManeuver,
}: ServiceCostSectionProps) => {
  return (
    <div className="space-y-3 border-t pt-3 mt-2">
      <CostItemDisplay
        label={`Banderazo ${selectedTruck.name}`}
        amount={flagDropFee}
        icon={<Flag className="w-4 h-4 text-primary" />}
        description={`Cargo inicial por servicio de grúa ${selectedTruck.name}`}
      />

      <CostItemDisplay
        label={`Servicio base ${selectedTruck.name}`}
        amount={baseCost}
        icon={<TrendingUp className="w-4 h-4 text-primary" />}
        description={`${totalDistance.toFixed(2)} km × ${formatCurrency(selectedTruck.perKm)}/km`}
      />
      
      {requiresManeuver && (
        <CostItemDisplay
          label={`Cargo por maniobra especial (${selectedTruck.name})`}
          amount={maneuverCost}
          icon={<Truck className="w-4 h-4 text-orange-500" />}
          description="Cargo adicional por maniobras especiales requeridas"
        />
      )}
    </div>
  );
};
