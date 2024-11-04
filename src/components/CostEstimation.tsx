import { Card } from "@/components/ui/card";
import { DollarSign, Route, Clock, Truck, ChevronDown, Receipt, CreditCard, Info } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";
import { motion, AnimatePresence } from "framer-motion";
import { TollInfoDisplay } from "./TollInfoDisplay";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PaymentWindow from "./payment/PaymentWindow";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="text-lg font-semibold text-gray-900">Estimación de Costo</div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Precio fijo garantizado sin cargos ocultos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <motion.div 
          className="text-3xl font-bold text-primary bg-primary/5 p-4 rounded-lg text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          ${finalCost.toFixed(2)} MXN
        </motion.div>

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

        <Separator className="my-2" />

        <motion.div 
          className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Receipt className="w-4 h-4 text-gray-500" />
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

        <AnimatePresence>
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