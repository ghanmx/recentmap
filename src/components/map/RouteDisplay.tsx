import { Card } from "@/components/ui/card";
import { Route, Shield } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";

interface RouteDisplayProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const RouteDisplay = ({ pickupLocation, dropLocation }: RouteDisplayProps) => {
  const { totalDistance } = useTowing();

  if (!pickupLocation || !dropLocation) return null;

  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-white/95 via-blue-50/95 to-white/95 backdrop-blur-md shadow-xl border border-blue-100/50">
      <div className="flex items-center gap-3 py-2">
        <Route className="w-4 h-4 text-gray-500" />
        <div>
          <p className="text-xs font-medium text-gray-900">Total Distance</p>
          <p className="text-base font-semibold text-primary">
            {totalDistance ? totalDistance.toFixed(2) : '0.00'} km
          </p>
        </div>
      </div>
    </Card>
  );
};