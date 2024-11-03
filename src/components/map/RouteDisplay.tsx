import { Card } from "@/components/ui/card";
import { Truck, Route, DollarSign, Shield } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";

interface RouteDisplayProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const RouteDisplay = ({ pickupLocation, dropLocation }: RouteDisplayProps) => {
  const { totalDistance, totalCost } = useTowing();

  if (!pickupLocation || !dropLocation) return null;

  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-white/95 via-blue-50/95 to-white/95 backdrop-blur-md shadow-xl border border-blue-100/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <DollarSign className="w-4 h-4 text-primary" />
          </div>
          <div className="text-base font-semibold text-gray-900">Estimated Price</div>
        </div>
        <div className="bg-green-50 px-2 py-1 rounded-full border border-green-200">
          <span className="text-xs font-medium text-green-700">Fixed Price</span>
        </div>
      </div>
      
      <div className="text-2xl font-bold text-primary bg-primary/5 p-3 rounded-lg flex items-center justify-between">
        <span>${totalCost ? totalCost.toFixed(2) : '0.00'}</span>
        <Shield className="w-5 h-5 text-primary/60" />
      </div>

      <div className="flex items-center gap-3 py-2">
        <Route className="w-4 h-4 text-gray-500" />
        <div>
          <p className="text-xs font-medium text-gray-900">Total Distance</p>
          <p className="text-base font-semibold text-primary">
            {totalDistance ? totalDistance.toFixed(2) : '0.00'} km
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
        <p className="text-xs text-blue-700 flex items-center gap-2">
          <Truck className="w-3 h-3" />
          <span>Price includes all service fees and taxes</span>
        </p>
      </div>
    </Card>
  );
};