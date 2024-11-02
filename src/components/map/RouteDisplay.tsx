import { Card } from "@/components/ui/card";
import { Truck, Route, DollarSign, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RouteDisplayProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const RouteDisplay = ({ pickupLocation, dropLocation }: RouteDisplayProps) => {
  const { totalDistance, totalCost } = useTowing();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="relative p-4 sm:p-6 space-y-4 bg-gradient-to-br from-white/95 via-blue-50/95 to-white/95 backdrop-blur-md shadow-xl border border-blue-100/50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-2 top-2 sm:hidden z-10"
        aria-label={isExpanded ? "Collapse details" : "Expand details"}
      >
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-900">Estimated Price</div>
        </div>
        <div className="bg-green-50 px-2 sm:px-3 py-1 rounded-full border border-green-200">
          <span className="text-xs sm:text-sm font-medium text-green-700">Fixed Price</span>
        </div>
      </div>
      
      <div className="text-2xl sm:text-4xl font-bold text-primary bg-primary/5 p-3 sm:p-4 rounded-lg flex items-center justify-between">
        <span>${totalCost ? totalCost.toFixed(2) : '0.00'}</span>
        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary/60" />
      </div>

      <div 
        className={`space-y-3 divide-y divide-gray-100 transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 sm:max-h-[500px] sm:opacity-100'
        }`}
      >
        <div className="flex items-center gap-3 py-3">
          <Route className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-900">Total Distance</p>
            <p className="text-base sm:text-lg font-semibold text-primary">
              {totalDistance ? totalDistance.toFixed(2) : '0.00'} km
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-100 mt-2">
          <p className="text-xs sm:text-sm text-blue-700 flex items-center gap-2">
            <Truck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="line-clamp-2">Price includes all service fees and taxes</span>
          </p>
        </div>
      </div>
    </Card>
  );
};