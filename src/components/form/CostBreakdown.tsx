import { Card } from "@/components/ui/card";
import { DollarSign, Route, Truck } from "lucide-react";
import { towTruckTypes } from "@/utils/towTruckPricing";

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
  totalCost,
}: CostBreakdownProps) => {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-md shadow-xl border border-blue-100">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div className="text-lg font-semibold text-gray-900">Desglose de Costos</div>
      </div>

      <div className="space-y-3 divide-y divide-gray-100">
        <div className="flex items-center gap-3 py-3">
          <Route className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Distancia Total</p>
            <p className="text-lg font-semibold text-primary">
              {distance.toFixed(2)} km
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Precio Base</p>
            <p className="text-lg font-semibold text-primary">
              ${basePrice.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Costo por Distancia</p>
            <div>
              <p className="text-lg font-semibold text-primary">
                ${costPerKm.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                ({(costPerKm / distance).toFixed(2)}/km)
              </p>
            </div>
          </div>
          {maneuverCost > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-900">Costo de Maniobra</p>
              <p className="text-lg font-semibold text-primary">
                ${maneuverCost.toFixed(2)}
              </p>
            </div>
          )}
          {tollFees > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-900">Casetas</p>
              <p className="text-lg font-semibold text-primary">
                ${tollFees.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-lg font-bold text-gray-900">Costo Total</p>
          <p className="text-2xl font-bold text-primary">
            ${totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mt-2">
        <p className="text-sm text-blue-700 flex items-center gap-2">
          <Truck className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-2">El precio incluye todos los cargos por servicio e impuestos</span>
        </p>
      </div>
    </Card>
  );
};