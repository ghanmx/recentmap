import { Route, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CostMetricsProps {
  totalDistance: number;
}

export const CostMetrics = ({ totalDistance }: CostMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Route className="w-4 h-4 text-gray-500" />
        <div>
          <p className="text-xs font-medium text-gray-600">Distancia</p>
          <p className="text-sm font-semibold text-primary">
            {totalDistance ? totalDistance.toFixed(2) : '0.00'} km
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Clock className="w-4 h-4 text-gray-500" />
        <div>
          <p className="text-xs font-medium text-gray-600">Tiempo Est.</p>
          <p className="text-sm font-semibold text-primary">
            {totalDistance ? Math.ceil(totalDistance / 50) : '0'} hr
          </p>
        </div>
      </motion.div>
    </div>
  );
};