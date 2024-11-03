import { Card } from "@/components/ui/card";
import { DollarSign, Route, Shield, Clock, Truck } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";
import { motion } from "framer-motion";
import { TollInfoDisplay } from "./TollInfoDisplay";

export const CostEstimation = () => {
  const { totalDistance, totalCost, detectedTolls, totalTollCost } = useTowing();

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-white via-blue-50/50 to-white border-blue-100 w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="text-lg font-semibold text-gray-900">Cost Estimation</div>
        </div>
        <motion.div 
          className="bg-green-50 px-3 py-1 rounded-full border border-green-200"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm font-medium text-green-700">Fixed Price</span>
        </motion.div>
      </div>

      <motion.div 
        className="text-3xl font-bold text-primary bg-primary/5 p-4 rounded-lg flex items-center justify-between"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span>${totalCost ? totalCost.toFixed(2) : '0.00'}</span>
        <Shield className="w-6 h-6 text-primary/60" />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-lg">
          <Route className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs font-medium text-gray-600">Distance</p>
            <p className="text-sm font-semibold text-primary">
              {totalDistance ? totalDistance.toFixed(2) : '0.00'} km
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-lg">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs font-medium text-gray-600">Est. Time</p>
            <p className="text-sm font-semibold text-primary">
              {totalDistance ? Math.ceil(totalDistance / 50) : '0'} hr
            </p>
          </div>
        </div>
      </div>

      {detectedTolls.length > 0 && (
        <TollInfoDisplay tolls={detectedTolls} totalCost={totalTollCost} />
      )}

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Truck className="w-4 h-4" />
          <span>Precio incluye servicio, impuestos y seguro</span>
        </div>
      </div>
    </Card>
  );
};