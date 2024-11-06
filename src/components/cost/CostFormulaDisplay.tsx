import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/priceCalculator";
import { TowTruckType } from "@/utils/towTruckPricing";

interface CostFormulaDisplayProps {
  selectedTruck: TowTruckType;
  requiresManeuver: boolean;
  requiresInvoice: boolean;
}

export const CostFormulaDisplay = ({
  selectedTruck,
  requiresManeuver,
  requiresInvoice,
}: CostFormulaDisplayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-lg mt-2"
    >
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="w-4 h-4 text-primary" />
        <span className="font-medium">Fórmula de cálculo para grúa {selectedTruck.name}:</span>
      </div>
      <div className="pl-6 space-y-1">
        <p>• Distancia × {formatCurrency(selectedTruck.perKm)}/km (tarifa {selectedTruck.name})</p>
        <p>• Banderazo {selectedTruck.name}: {formatCurrency(selectedTruck.flagDropFee)}</p>
        {requiresManeuver && (
          <p>• Cargo por maniobra {selectedTruck.name}: {formatCurrency(selectedTruck.maneuverCharge)}</p>
        )}
        {requiresInvoice && <p>• IVA: 16% del subtotal</p>}
      </div>
    </motion.div>
  );
};