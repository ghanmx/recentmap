import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";
import { useState } from "react";

interface RouteDisplayProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const RouteDisplay = ({ pickupLocation, dropLocation }: RouteDisplayProps) => {
  const { totalCost } = useTowing();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="relative p-4 sm:p-6 space-y-4 bg-gradient-to-br from-white/95 via-blue-50/95 to-white/95 backdrop-blur-md shadow-xl border border-blue-100/50">
      <div className="text-2xl sm:text-4xl font-bold text-primary bg-primary/5 p-3 sm:p-4 rounded-lg flex items-center justify-between">
        <span>${totalCost ? totalCost.toFixed(2) : '0.00'}</span>
        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary/60" />
      </div>
    </Card>
  );
};