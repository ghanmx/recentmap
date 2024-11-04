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
  maneuverCost: number;
  requiresManeuver: boolean;
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
  setShowPaymentWindow,
  maneuverCost,
  requiresManeuver
}: CostBreakdownProps) => {
  const renderCostItem = (label: string, amount: number, indent: boolean = false) => (
    <div className={`flex justify-between text-sm text-gray-600 ${indent ? 'pl-4' : ''}`}>
      <span>{label}</span>
      <span>${amount.toFixed(2)}</span>
    </div>
  );

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between p-3 text-sm text-gray-600 hover:bg-gray-50"
      >
        <span>Ver desglose de precios</span>
        <motion.div
          animate={{ rotate: showBreakdown ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </Button>

      {showBreakdown && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pt-2 border-t border-gray-100"
        >
          {renderCostItem(`Servicio base (${totalDistance.toFixed(2)} km × $${towTruckTypes.A.perKm.toFixed(2)})`, baseCost)}
          
          {requiresManeuver && renderCostItem('Cargo por maniobra especial', maneuverCost)}

          {detectedTolls.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm text-gray-600 font-medium">Peajes:</div>
              {detectedTolls.map((toll, index) => (
                <motion.div key={index} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
                  {renderCostItem(toll.name, toll.cost, true)}
                </motion.div>
              ))}
            </div>
          )}

          {requiresInvoice && renderCostItem('IVA (16%)', tax)}

          <div className="pt-2 border-t border-gray-100">
            {renderCostItem('Total', finalCost)}
          </div>

          <Button
            onClick={() => setShowPaymentWindow(true)}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar ${finalCost.toFixed(2)}
          </Button>
        </motion.div>
      )}
    </>
  );
};