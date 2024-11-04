import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface FormCostSummaryProps {
  tollFees: number;
  estimatedCost: number;
}

export const FormCostSummary = ({ tollFees, estimatedCost }: FormCostSummaryProps) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 border-green-100">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-green-700">Total: ${(tollFees + estimatedCost).toFixed(2)}</h3>
      </div>
    </Card>
  );
};