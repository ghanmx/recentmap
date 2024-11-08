import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTowing } from "@/contexts/TowingContext";
import { towTruckTypes } from "@/utils/towTruckPricing";
import PaymentWindow from "./payment/PaymentWindow";
import { CostHeader } from "./cost/CostHeader";
import { CostMetrics } from "./cost/CostMetrics";
import { CostBreakdown } from "./cost/CostBreakdown";
import { useToast } from "@/hooks/use-toast";
import { TollLocation } from "@/data/tollData";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./ui/dialog";
import { TermsAndConditions } from "./legal/TermsAndConditions";
import { ScrollArea } from "./ui/scroll-area";
import { Info } from "lucide-react";

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
  const { toast } = useToast();

  const selectedTruck = towTruckTypes[truckType || 'A'];
  const baseCost = totalDistance * selectedTruck.perKm;
  const flagDropFee = selectedTruck.flagDropFee;
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0;
  const subtotal = baseCost + flagDropFee + maneuverCost + totalTollCost;
  const tax = requiresInvoice ? subtotal * 0.16 : 0;
  const finalCost = subtotal + tax;

  const handleBreakdownToggle = useCallback((value: boolean) => {
    setShowBreakdown(value);
    if (value) {
      toast({
        title: "Desglose de costos",
        description: "Ahora puedes ver el detalle de los costos del servicio",
      });
    }
  }, [toast]);

  const processedTolls = detectedTolls.map((toll: TollLocation) => ({
    name: toll.name,
    cost: toll.cost,
    direction: toll.direction || 'outbound'
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 w-full max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-white/95 via-blue-50/30 to-white backdrop-blur-sm rounded-lg shadow-lg p-4 space-y-4 border border-blue-100/50 hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Info className="w-4 h-4" />
                Términos y Condiciones
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogTitle>Términos y Condiciones del Servicio</DialogTitle>
              <DialogDescription>
                Por favor, lea cuidadosamente los términos y condiciones antes de proceder.
              </DialogDescription>
              <ScrollArea className="h-full pr-4">
                <TermsAndConditions />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

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
              className="space-y-4"
            >
              <CostMetrics
                totalDistance={totalDistance}
                requiresInvoice={requiresInvoice}
                setRequiresInvoice={setRequiresInvoice}
                requiresManeuver={requiresManeuver}
                onManeuverChange={updateManeuverRequired}
                selectedTruck={selectedTruck}
              />

              <CostBreakdown
                baseCost={baseCost}
                flagDropFee={flagDropFee}
                tax={tax}
                totalDistance={totalDistance}
                totalTollCost={totalTollCost}
                finalCost={finalCost}
                detectedTolls={processedTolls}
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
                className: "bg-green-50 border-green-200",
              });
            }
          }}
        />
      </div>
    </motion.div>
  );
};