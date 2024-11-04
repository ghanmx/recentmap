import { motion } from "framer-motion";
import { ChevronDown, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { towTruckTypes } from "@/utils/towTruckPricing";

interface CostBreakdownProps {
  showBreakdown: boolean;
  setShowBreakdown: (show: boolean) => void;
  totalDistance: number;
  baseCost: number;
  tax: number;
  finalCost: number;
  detectedTolls: Array<{ name: string; cost: number }>;
  requiresInvoice: boolean;
  setShowPaymentWindow: (show: boolean) => void;
}

export const CostBreakdown = ({
  showBreakdown,
  setShowBreakdown,
  totalDistance,
  baseCost,
  tax,
  finalCost,
  detectedTolls,
  requiresInvoice,
  setShowPaymentWindow
}: CostBreakdownProps) => {
  return (
    <>
      <motion.button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        whileHover={{ backgroundColor: "rgb(249 250 251)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Ver desglose de precios</span>
        <motion.div
          animate={{ rotate: showBreakdown ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {showBreakdown && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pt-2 border-t border-gray-100"
        >
          <div className="flex justify-between text-sm text-gray-600">
            <span>Servicio base ({totalDistance.toFixed(2)} km × ${towTruckTypes.A.perKm.toFixed(2)})</span>
            <span>${baseCost.toFixed(2)}</span>
          </div>

          {detectedTolls.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm text-gray-600 font-medium">Peajes:</div>
              {detectedTolls.map((toll, index) => (
                <motion.div 
                  key={index} 
                  className="flex justify-between text-sm text-gray-600 pl-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span>{toll.name}</span>
                  <span>${toll.cost.toFixed(2)}</span>
                </motion.div>
              ))}
            </div>
          )}

          {requiresInvoice && (
            <motion.div 
              className="flex justify-between text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span>IVA (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </motion.div>
          )}

          <motion.div 
            className="flex justify-between text-sm font-semibold text-primary pt-2 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>Total</span>
            <span>${finalCost.toFixed(2)}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => setShowPaymentWindow(true)}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold group relative overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pagar ${finalCost.toFixed(2)}
              </span>
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};