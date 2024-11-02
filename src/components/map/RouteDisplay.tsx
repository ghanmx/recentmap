import { Card } from "@/components/ui/card";
import { Shield, DollarSign, Route, Clock } from "lucide-react";
import { useTowing } from "@/contexts/TowingContext";
import { Separator } from "@/components/ui/separator";

export const RouteDisplay = ({ pickupLocation, dropLocation }: {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}) => {
  const { totalCost, totalDistance } = useTowing();

  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-blue-100 shadow-lg z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-3 bg-primary/5 p-3 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-primary">
                ${totalCost ? totalCost.toFixed(2) : '0.00'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 bg-secondary/5 p-3 rounded-lg">
            <Route className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-2xl font-bold text-secondary">
                {totalDistance ? `${totalDistance.toFixed(1)} km` : '0 km'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 bg-emerald-50 p-3 rounded-lg">
            <Clock className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">Est. Time</p>
              <p className="text-2xl font-bold text-emerald-600">
                {totalDistance ? `${Math.ceil(totalDistance / 50)} hr` : '0 hr'}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary/60" />
            <span>Secure Payment</span>
          </div>
          <span>24/7 Support Available</span>
        </div>
      </div>
    </Card>
  );
};