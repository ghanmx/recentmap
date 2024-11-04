import { useState } from "react";
import { motion } from "framer-motion";
import { useTowing } from "@/contexts/TowingContext";
import { towTruckTypes } from "@/utils/towTruckPricing";
import PaymentWindow from "./payment/PaymentWindow";
import { CostHeader } from "./cost/CostHeader";
import { CostMetrics } from "./cost/CostMetrics";
import { CostBreakdown } from "./cost/CostBreakdown";

export const CostEstimation = () => {
  const { 
    totalDistance, 
    detectedTolls, 
    totalTollCost, 
    truckType, 
    requiresManeuver 
  } = useTowing();
  
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [requiresInvoice, setRequiresInvoice] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);

  const selectedTruck = towTruckTypes[truckType || 'A'];
  const baseCost = totalDistance * selectedTruck.perKm;
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0;
  const subtotal = baseCost + maneuverCost + totalTollCost;
  const tax = requiresInvoice ? subtotal * 0.16 : 0;
  const finalCost = subtotal + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-6"
    >
      <div className="cost-header">
        <h2>Estimación de Costo</h2>
        <button onClick={() => setShowBreakdown(!showBreakdown)}>
          {showBreakdown ? 'Ocultar desglose' : 'Ver desglose'}
        </button>
        <div className="total-cost">${finalCost.toFixed(2)} MXN</div>
      </div>

      {showBreakdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          <CostMetrics
            totalDistance={totalDistance}
            requiresInvoice={requiresInvoice}
            setRequiresInvoice={setRequiresInvoice}
          />

          <CostBreakdown
            baseCost={baseCost}
            tax={tax}
            totalDistance={totalDistance}
            totalTollCost={totalTollCost}
            finalCost={finalCost}
            detectedTolls={detectedTolls}
            requiresInvoice={requiresInvoice}
            setShowPaymentWindow={setShowPaymentWindow}
            maneuverCost={maneuverCost}
            requiresManeuver={requiresManeuver}
            selectedTruck={selectedTruck}
          />
        </motion.div>
      )}

      <PaymentWindow
        isOpen={showPaymentWindow}
        onClose={() => setShowPaymentWindow(false)}
        amount={finalCost}
      />
    </motion.div>
  );
};