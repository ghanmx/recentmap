import { TollLocation } from "@/data/tollData";
import { CostItemDisplay } from "./CostItemDisplay";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import { calculateTotalTollCost } from "@/utils/tollUtils";
import { motion } from "framer-motion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "../ui/tooltip";

interface TollBreakdownSectionProps {
  tolls: TollLocation[];
  direction: 'outbound' | 'return';
}

export const TollBreakdownSection = ({ tolls, direction }: TollBreakdownSectionProps) => {
  if (tolls.length === 0) return null;

  const isOutbound = direction === 'outbound';
  const icon = isOutbound ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />;
  const label = isOutbound ? 'Peajes de ida:' : 'Peajes de regreso:';
  const totalCost = calculateTotalTollCost(tolls);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2 text-sm text-blue-600">
        {icon}
        <span>{label}</span>
      </div>
      {tolls.map((toll, index) => (
        <motion.div
          key={`${direction}-toll-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TooltipProvider>
            <div className="flex items-center gap-2">
              <CostItemDisplay
                label={toll.name}
                amount={toll.cost}
                indent
              />
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-primary/60 hover:text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1 text-sm">
                    <p>Horario: {toll.operatingHours}</p>
                    <p>Pagos aceptados: {toll.acceptedPayments.join(', ')}</p>
                    {toll.status !== 'active' && (
                      <p className="text-yellow-500">Estado: {toll.status}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <CostItemDisplay
          label={`Total peajes ${isOutbound ? 'ida' : 'regreso'}`}
          amount={totalCost}
          className="font-medium text-primary"
        />
      </motion.div>
    </motion.div>
  );
};