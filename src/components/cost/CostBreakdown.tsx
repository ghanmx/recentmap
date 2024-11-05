import { Button } from "@/components/ui/button";
import { TowTruckType } from "@/utils/towTruckPricing";
import { formatCurrency } from "@/utils/priceCalculator";
import { Card } from "@/components/ui/card";
import { Receipt, Truck, TrendingUp, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const renderCostItem = (label: string, amount: number, icon?: React.ReactNode, indent: boolean = false) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex justify-between items-center text-sm text-gray-600 ${indent ? 'pl-4' : ''}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{formatCurrency(amount)}</span>
    </motion.div>
  );

  return (
    <Card className="p-4 space-y-4 bg-white/50">
      <div className="space-y-2">
        <motion.div 
          key={selectedTruck.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
        >
          <Truck className={`w-5 h-5 ${selectedTruck.name === 'Tipo D' ? 'text-orange-500' : 'text-primary'}`} />
          <span>{selectedTruck.name} - {selectedTruck.capacity}</span>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <div className="space-y-3 border-t pt-3">
            <motion.div
              key={`flag-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {renderCostItem(
                `Banderazo (${selectedTruck.name})`,
                selectedTruck.flagDropFee,
                <Flag className="w-4 h-4 text-primary" />
              )}
            </motion.div>

            <motion.div
              key={`base-${selectedTruck.name}-${totalDistance}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {renderCostItem(
                `Servicio base ${selectedTruck.name} (${totalDistance.toFixed(2)} km × ${formatCurrency(selectedTruck.perKm)}/km)`,
                baseCost,
                <TrendingUp className="w-4 h-4 text-primary" />
              )}
            </motion.div>
            
            {requiresManeuver && (
              <motion.div
                key={`maneuver-${selectedTruck.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {renderCostItem(
                  `Cargo por maniobra especial (${selectedTruck.name})`,
                  selectedTruck.maneuverCharge,
                  <Truck className="w-4 h-4 text-orange-500" />
                )}
              </motion.div>
            )}

            {detectedTolls.length > 0 && (
              <motion.div
                key={`tolls-${selectedTruck.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-primary" />
                  Peajes:
                </div>
                {detectedTolls.map((toll, index) => (
                  renderCostItem(toll.name, toll.cost, undefined, true)
                ))}
                {renderCostItem('Total peajes', totalTollCost)}
              </motion.div>
            )}

            <motion.div
              key={`subtotal-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-2 mt-2"
            >
              {renderCostItem('Subtotal', subtotal)}
              
              {requiresInvoice && renderCostItem(
                'IVA (16%)',
                tax,
                <Receipt className="w-4 h-4 text-green-500" />
              )}
            </motion.div>

            <motion.div
              key={`total-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-3 text-lg font-bold flex justify-between items-center"
            >
              <span>Total</span>
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