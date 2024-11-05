import { Dispatch, SetStateAction } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/utils/priceCalculator";
import { Button } from "@/components/ui/button";

interface CostHeaderProps {
  showBreakdown: boolean;
  setShowBreakdown: Dispatch<SetStateAction<boolean>>;
  finalCost: number;
}

export const CostHeader = ({ showBreakdown, setShowBreakdown, finalCost }: CostHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Costo estimado</h3>
        <p className="text-2xl font-bold text-primary">{formatCurrency(finalCost)}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="text-gray-500 hover:text-gray-700"
      >
        {showBreakdown ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};