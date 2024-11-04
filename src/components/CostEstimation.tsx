import { Card } from "@/components/ui/card";
import { useTowing } from "@/contexts/TowingContext";
import { motion, AnimatePresence } from "framer-motion";
import { TollInfoDisplay } from "./TollInfoDisplay";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PaymentWindow from "./payment/PaymentWindow";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { Separator } from "@/components/ui/separator";
import { CostHeader } from "./cost/CostHeader";
import { CostMetrics } from "./cost/CostMetrics";
import { CostBreakdown } from "./cost/CostBreakdown";

export const CostEstimation = () => {
  const { totalDistance, totalCost, detectedTolls, totalTollCost } = useTowing();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [requiresInvoice, setRequiresInvoice] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const { toast } = useToast();

  const baseCost = totalDistance * towTruckTypes.A.perKm;
  const tax = requiresInvoice ? baseCost * 0.16 : 0;
  const finalCost = baseCost + totalTollCost + tax;

  const handlePaymentSubmit = (result: { success: boolean; error?: string }) => {
    if (result.success) {
      toast({
        title: "Pago exitoso",
        description: "Tu pago ha sido procesado correctamente.",
      });
    } else {
      toast({
        title: "Error en el pago",
        description: result.error || "Hubo un error al procesar el pago.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 space-y-4 bg-gradient-to-br from-white via-blue-50/50 to-white border-blue-100 w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all">
        <CostHeader />

        <motion.div 
          className="text-3xl font-bold text-primary bg-primary/5 p-4 rounded-lg text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          ${finalCost.toFixed(2)} MXN
        </motion.div>

        <CostMetrics totalDistance={totalDistance} />

        <Separator className="my-2" />

        <motion.div 
          className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Label htmlFor="invoice-required">Requiere factura (+16% IVA)</Label>
          <Switch
            id="invoice-required"
            checked={requiresInvoice}
            onCheckedChange={setRequiresInvoice}
          />
        </motion.div>

        {detectedTolls.length > 0 && (
          <TollInfoDisplay tolls={detectedTolls} totalCost={totalTollCost} />
        )}

        <AnimatePresence>
          <CostBreakdown
            showBreakdown={showBreakdown}
            setShowBreakdown={setShowBreakdown}
            totalDistance={totalDistance}
            baseCost={baseCost}
            tax={tax}
            finalCost={finalCost}
            detectedTolls={detectedTolls}
            requiresInvoice={requiresInvoice}
            setShowPaymentWindow={setShowPaymentWindow}
          />
        </AnimatePresence>

        <PaymentWindow
          isOpen={showPaymentWindow}
          onClose={() => setShowPaymentWindow(false)}
          onPaymentSubmit={handlePaymentSubmit}
          totalCost={finalCost}
        />
      </Card>
    </motion.div>
  );
};