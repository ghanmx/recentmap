import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTowing } from "@/contexts/TowingContext";
import { towTruckTypes } from "@/utils/towTruckPricing";
import PaymentWindow from "./payment/PaymentWindow";
import { CostHeader } from "./cost/CostHeader";
import { CostMetrics } from "./cost/CostMetrics";
import { CostBreakdown } from "./cost/CostBreakdown";
import { useToast } from "@/hooks/use-toast";
import { calculateTotalCost } from "@/utils/priceCalculator";

export const CostEstimation = () => {
  const { 
    totalDistance, 
    detectedTolls, 
    totalTollCost, 
    truckType, 
    requiresManeuver,
    updateManeuverRequired,
    selectedVehicleModel,
  } = useTowing();
  
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [requiresInvoice, setRequiresInvoice] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const [hasShownManeuverToast, setHasShownManeuverToast] = useState(false);
  const [hasShownInvoiceToast, setHasShownInvoiceToast] = useState(false);
  const [hasShownTruckToast, setHasShownTruckToast] = useState(false);
  const { toast } = useToast();

  const selectedTruck = towTruckTypes[truckType || 'A'];
  const baseCost = totalDistance * selectedTruck.perKm;
  const flagDropFee = selectedTruck.flagDropFee;
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0;
  
  const subtotal = baseCost + flagDropFee + maneuverCost + totalTollCost;
  const tax = requiresInvoice ? subtotal * 0.16 : 0;
  const finalCost = calculateTotalCost(
    totalDistance,
    truckType,
    requiresManeuver,
    totalTollCost,
    requiresInvoice
  );

  useEffect(() => {
    if (requiresManeuver && !hasShownManeuverToast) {
      toast({
        title: `Cargo por maniobra aplicado para ${selectedTruck.name}`,
        description: `Se ha agregado un cargo de ${selectedTruck.maneuverCharge.toFixed(2)} MXN por maniobra especial`,
      });
      setHasShownManeuverToast(true);
    }
  }, [requiresManeuver, selectedTruck, hasShownManeuverToast, toast]);

  useEffect(() => {
    if (requiresInvoice && !hasShownInvoiceToast) {
      toast({
        title: "IVA aplicado",
        description: `Se ha agregado el 16% de IVA al subtotal (${(subtotal * 0.16).toFixed(2)} MXN)`,
      });
      setHasShownInvoiceToast(true);
    }
  }, [requiresInvoice, subtotal, hasShownInvoiceToast, toast]);

  useEffect(() => {
    if (!hasShownTruckToast) {
      toast({
        title: `${selectedTruck.name} seleccionada`,
        description: `Tarifa base: ${selectedTruck.perKm.toFixed(2)} MXN/km - Banderazo: ${selectedTruck.flagDropFee.toFixed(2)} MXN`,
      });
      setHasShownTruckToast(true);
    }
  }, [truckType, selectedTruck, hasShownTruckToast, toast]);

  const handleBreakdownToggle = useCallback((value: boolean) => {
    setShowBreakdown(value);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 w-full"
    >
      <div className={`bg-gradient-to-br from-white/95 via-blue-50/30 to-white backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-6 border ${
        truckType === 'D' ? 'border-orange-200' : 'border-blue-100/50'
      }`}>
        <CostHeader 
          showBreakdown={showBreakdown}
          setShowBreakdown={handleBreakdownToggle}
          finalCost={finalCost}
          truckType={truckType}
          selectedTruck={selectedTruck}
        />

        <AnimatePresence>
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
                requiresManeuver={requiresManeuver}
                onManeuverChange={(checked) => {
                  updateManeuverRequired(checked);
                  if (checked && !hasShownManeuverToast) {
                    toast({
                      title: "Maniobra especial requerida",
                      description: `Se aplicará un cargo adicional de ${selectedTruck.maneuverCharge.toFixed(2)} MXN para ${selectedTruck.name}`,
                    });
                    setHasShownManeuverToast(true);
                  }
                }}
                selectedTruck={selectedTruck}
              />

              <CostBreakdown
                baseCost={baseCost}
                flagDropFee={flagDropFee}
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
                subtotal={subtotal}
                selectedVehicleModel={selectedVehicleModel}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <PaymentWindow
          isOpen={showPaymentWindow}
          onClose={() => setShowPaymentWindow(false)}
          amount={finalCost}
          onPaymentSubmit={(result) => {
            if (result.success) {
              setShowPaymentWindow(false);
              toast({
                title: "Pago procesado",
                description: `Pago de ${finalCost.toFixed(2)} MXN procesado exitosamente para ${selectedTruck.name}`,
              });
            }
          }}
        />
      </div>
    </motion.div>
  );
};