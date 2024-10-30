import { useEffect } from "react";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Truck, Route, DollarSign } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";

interface RouteDisplayProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const RouteDisplay = ({ pickupLocation, dropLocation }: RouteDisplayProps) => {
  const { totalDistance, totalCost } = useTowing();
  const { toast } = useToast();

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-md shadow-xl border border-blue-100">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div className="text-lg font-semibold text-gray-900">Estimated Price</div>
      </div>
      
      <div className="text-4xl font-bold text-primary bg-primary/5 p-4 rounded-lg flex items-center gap-3">
        <span>${totalCost.toFixed(2)}</span>
        <span className="text-sm font-normal text-gray-600 bg-white/50 px-3 py-1 rounded-full">
          Fixed Price
        </span>
      </div>

      <div className="space-y-3 divide-y divide-gray-100">
        <div className="flex items-center gap-3 py-3">
          <Route className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Total Distance</p>
            <p className="text-lg font-semibold text-primary">
              {totalDistance.toFixed(2)} km
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700">
          Price includes all service fees and taxes. No hidden charges.
        </p>
      </div>
    </Card>
  );
};