import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface FormCostSummaryProps {
  tollFees: number;
  estimatedCost: number;
}

export const FormCostSummary = ({ tollFees, estimatedCost }: FormCostSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 border-green-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-700">Resumen de Costos</h3>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Peajes:</span>
            <span className="font-medium">${tollFees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Costo Estimado:</span>
            <span className="font-medium">${estimatedCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-green-200">
            <span className="font-semibold text-green-700">Total:</span>
            <span className="font-semibold text-green-700">
              ${(tollFees + estimatedCost).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};