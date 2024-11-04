import { Button } from "@/components/ui/button";
import { DollarSign, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const CostHeader = () => {
  return (
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
  );
};