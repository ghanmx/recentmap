import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/priceCalculator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TollInfoDisplay } from "@/components/TollInfoDisplay";

interface CostDetailsContentProps {
  totalDistance: number;
  baseCost: number;
  flagDropFee: number;
  maneuverCost: number;
  requiresManeuver: boolean;
  totalTollCost: number;
  detectedTolls: any[];
}

export const CostDetailsContent = ({
  totalDistance,
  baseCost,
  flagDropFee,
  maneuverCost,
  requiresManeuver,
  totalTollCost,
  detectedTolls,
}: CostDetailsContentProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)] pr-4">
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-3 bg-primary/5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Distancia ({totalDistance.toFixed(1)} km):</span>
            <span className="font-medium text-primary">{formatCurrency(baseCost)}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 bg-primary/5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Banderazo:</span>
            <span className="font-medium text-primary">{formatCurrency(flagDropFee)}</span>
          </div>
        </motion.div>

        {requiresManeuver && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 bg-orange-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700">Maniobra:</span>
              <span className="font-medium text-orange-600">{formatCurrency(maneuverCost)}</span>
            </div>
          </motion.div>
        )}

        {totalTollCost > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-3 bg-yellow-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-700">Peajes:</span>
              <span className="font-medium text-yellow-600">{formatCurrency(totalTollCost)}</span>
            </div>
          </motion.div>
        )}
      </div>

      {detectedTolls.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <TollInfoDisplay tolls={detectedTolls} totalCost={totalTollCost} />
        </motion.div>
      )}
    </ScrollArea>
  );
};