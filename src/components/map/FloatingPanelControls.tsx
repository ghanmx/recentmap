import { useState } from "react";
import { DollarSign, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingPanelControlsProps } from "./types/floating-panel";
import { useTowing } from "@/contexts/TowingContext";
import { formatCurrency } from "@/utils/priceCalculator";
import { towTruckTypes } from "@/utils/towTruckPricing";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FloatingPanelHeader } from "./FloatingPanelHeader";
import { CostDetailsContent } from "./CostDetailsContent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FloatingPanelControls = ({
  isCollapsed,
  isMaximized,
  onCollapse,
  onMaximize,
  onClose,
  title,
}: FloatingPanelControlsProps) => {
  const [showCostDetails, setShowCostDetails] = useState(false);
  const { totalDistance, truckType, requiresManeuver, totalTollCost, detectedTolls } = useTowing();
  const selectedTruck = towTruckTypes[truckType || "A"];
  const baseCost = totalDistance * selectedTruck.perKm;
  const flagDropFee = selectedTruck.flagDropFee;
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0;
  const subtotal = baseCost + flagDropFee + maneuverCost + totalTollCost;

  console.log('FloatingPanelControls rendered:', {
    totalDistance,
    truckType,
    subtotal,
    showCostDetails
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col h-full",
        "bg-gradient-to-br from-white/95 via-primary/5 to-primary/10",
        "backdrop-blur-sm border-t border-primary/20"
      )}
    >
      <FloatingPanelHeader
        title={title}
        isCollapsed={isCollapsed}
        isMaximized={isMaximized}
        onCollapse={onCollapse}
        onMaximize={onMaximize}
        onClose={onClose}
      />

      {!isCollapsed && (
        <div className="flex flex-col justify-between flex-grow">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4 px-4"
            >
              <Card className="p-4 bg-white/50 backdrop-blur-sm border border-primary/10 hover:shadow-lg transition-all duration-300">
                <TooltipProvider>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setShowCostDetails(!showCostDetails)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg hover:from-primary/10 hover:to-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-primary font-medium text-lg">Costo Estimado:</span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-primary">
                            {formatCurrency(subtotal)}
                          </span>
                          <Info className="h-4 w-4 text-primary/60" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click para ver desglose de costos</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.button>
                </TooltipProvider>

                <AnimatePresence>
                  {showCostDetails && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4"
                    >
                      <CostDetailsContent
                        totalDistance={totalDistance}
                        baseCost={baseCost}
                        flagDropFee={flagDropFee}
                        maneuverCost={maneuverCost}
                        requiresManeuver={requiresManeuver}
                        totalTollCost={totalTollCost}
                        detectedTolls={detectedTolls}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};