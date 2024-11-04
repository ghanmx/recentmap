import { Card } from "@/components/ui/card";
import { DollarSign, Route, Shield, Clock, Truck, ChevronDown, Receipt, CreditCard } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";
import { motion } from "framer-motion";
import { TollInfoDisplay } from "./TollInfoDisplay";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PaymentWindow from "./payment/PaymentWindow";
import { towTruckTypes } from "@/utils/towTruckPricing";

export const CostEstimation = () => {
  const { totalDistance, totalCost, detectedTolls, totalTollCost } = useTowing();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [requiresInvoice, setRequiresInvoice] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const { toast } = useToast();

  const baseCost = totalDistance * towTruckTypes.A.perKm; // Usando la tarifa correcta del tipo A
  const tax = requiresInvoice ? baseCost * 0.16 : 0; // 16% IVA solo si requiere factura
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
        <span>${finalCost.toFixed(2)}</span>
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

      <div className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg">
        <Receipt className="w-4 h-4 text-gray-500" />
        <Label htmlFor="invoice-required">Requiere factura</Label>
        <Switch
          id="invoice-required"
          checked={requiresInvoice}
          onCheckedChange={setRequiresInvoice}
        />
      </div>

      {detectedTolls.length > 0 && (
        <TollInfoDisplay tolls={detectedTolls} totalCost={totalTollCost} />
      )}

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Truck className="w-4 h-4" />
          <span>Precio incluye IVA</span>
        </div>
      </div>

      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span>Ver desglose de precios</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
      </button>

      {showBreakdown && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="space-y-2 pt-2 border-t border-gray-100"
        >
          <div className="flex justify-between text-sm text-gray-600">
            <span>Costo por distancia ({totalDistance.toFixed(2)} km × ${towTruckTypes.A.perKm.toFixed(2)})</span>
            <span>${baseCost.toFixed(2)}</span>
          </div>

          {detectedTolls.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm text-gray-600 font-medium">Peajes:</div>
              {detectedTolls.map((toll, index) => (
                <div key={index} className="flex justify-between text-sm text-gray-600 pl-4">
                  <span>{toll.name}</span>
                  <span>${toll.cost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {requiresInvoice && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>IVA (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm font-semibold text-primary pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${finalCost.toFixed(2)}</span>
          </div>

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
      )}

      <PaymentWindow
        isOpen={showPaymentWindow}
        onClose={() => setShowPaymentWindow(false)}
        onPaymentSubmit={handlePaymentSubmit}
        totalCost={finalCost}
      />
    </Card>
  );
};