import { TowTruckType } from "@/utils/towTruckPricing";
import { formatCurrency } from "@/utils/priceCalculator";
import { Card } from "@/components/ui/card";
import { Receipt, Truck, TrendingUp, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CostFormulaDisplay } from "./CostFormulaDisplay";
import { CostItemDisplay } from "./CostItemDisplay";
import { TruckInfoHeader } from "./TruckInfoHeader";

interface CostBreakdownProps {
  baseCost: number;
  flagDropFee: number;
  tax: number;
  totalDistance: number;
  totalTollCost: number;
  finalCost: number;
  detectedTolls: Array<{ name: string; cost: number }>;
  requiresInvoice: boolean;
  setShowPaymentWindow: (show: boolean) => void;
  maneuverCost: number;
  requiresManeuver: boolean;
  selectedTruck: TowTruckType;
  subtotal: number;
}

export const CostBreakdown = ({
  baseCost,
  flagDropFee,
  tax,
  totalDistance,
  totalTollCost,
  finalCost,
  detectedTolls,
  requiresInvoice,
  setShowPaymentWindow,
  maneuverCost,
  requiresManeuver,
  selectedTruck,
  subtotal,
}: CostBreakdownProps) => {
  return (
    <Card className="p-4 space-y-4 bg-white/50">
      <div className="space-y-2">
        <motion.div 
          key={selectedTruck.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          <TruckInfoHeader selectedTruck={selectedTruck} />
          <CostFormulaDisplay 
            selectedTruck={selectedTruck}
            requiresManeuver={requiresManeuver}
            requiresInvoice={requiresInvoice}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          <div className="space-y-3 border-t pt-3 mt-2">
            <CostItemDisplay
              label={`Banderazo ${selectedTruck.name}`}
              amount={flagDropFee}
              icon={<Flag className="w-4 h-4 text-primary" />}
            />

            <CostItemDisplay
              label={`Servicio base ${selectedTruck.name} (${totalDistance.toFixed(2)} km × ${formatCurrency(selectedTruck.perKm)}/km)`}
              amount={baseCost}
              icon={<TrendingUp className="w-4 h-4 text-primary" />}
            />
            
            {requiresManeuver && (
              <CostItemDisplay
                label={`Cargo por maniobra especial (${selectedTruck.name})`}
                amount={selectedTruck.maneuverCharge}
                icon={<Truck className="w-4 h-4 text-orange-500" />}
              />
            )}

            {detectedTolls.length > 0 && (
              <motion.div
                key={`tolls-${selectedTruck.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-primary" />
                  Peajes detectados:
                </div>
                {detectedTolls.map((toll, index) => (
                  <CostItemDisplay
                    key={`toll-${index}`}
                    label={toll.name}
                    amount={toll.cost}
                    indent
                  />
                ))}
                <CostItemDisplay
                  label="Total peajes"
                  amount={totalTollCost}
                />
              </motion.div>
            )}

            <motion.div
              key={`subtotal-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-2 mt-2"
            >
              <CostItemDisplay
                label="Subtotal"
                amount={subtotal}
              />
              
              {requiresInvoice && (
                <CostItemDisplay
                  label="IVA (16%)"
                  amount={tax}
                  icon={<Receipt className="w-4 h-4 text-green-500" />}
                />
              )}
            </motion.div>

            <motion.div
              key={`total-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-3 text-lg font-bold flex justify-between items-center"
            >
              <span>Total Final</span>
              <span className={`${selectedTruck.name === 'Tipo D' ? 'text-orange-500' : 'text-primary'}`}>
                {formatCurrency(finalCost)}
              </span>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      <Button
        className={`w-full ${
          selectedTruck.name === 'Tipo D' 
            ? 'bg-orange-500 hover:bg-orange-600' 
            : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={() => setShowPaymentWindow(true)}
      >
        Proceder al pago
      </Button>
    </Card>
  );
};