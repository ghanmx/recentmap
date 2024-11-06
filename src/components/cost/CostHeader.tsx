import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/priceCalculator";
import { motion } from "framer-motion";
import { TowTruckType } from "@/utils/towTruckPricing";

export interface CostHeaderProps {
  showBreakdown: boolean;
  setShowBreakdown: (show: boolean) => void;
  finalCost: number;
  truckType: "A" | "B" | "C" | "D";
  selectedTruck: TowTruckType;
}

export const CostHeader = ({
  showBreakdown,
  setShowBreakdown,
  finalCost,
  truckType,
  selectedTruck,
}: CostHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Costo Estimado</h2>
        <p className="text-sm text-gray-600">{selectedTruck.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          key={finalCost}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-2xl font-bold ${truckType === 'D' ? 'text-orange-500' : 'text-primary'}`}
        >
          {formatCurrency(finalCost)}
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="hover:bg-primary/10"
        >
          {showBreakdown ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};