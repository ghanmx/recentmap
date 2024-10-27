import { useState } from "react";
import { Card } from "@/components/ui/card";
import TowMap from "@/components/TowMap";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { useToast } from "@/components/ui/use-toast";

const UserPage = () => {
  const [priceDetails, setPriceDetails] = useState<{ totalPrice: number; totalDistance: number } | null>(null);
  const { toast } = useToast();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Request a Tow Truck</h1>
          <p className="text-gray-600">Drag markers to adjust pickup and drop-off locations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="text-lg font-semibold">Estimated Price</div>
            <div className="text-3xl font-bold text-primary">
              ${priceDetails?.totalPrice || 0}
            </div>
            <p className="text-sm text-gray-500">
              Price is calculated based on actual road distance and service type
            </p>
            {priceDetails?.totalDistance && (
              <p className="text-sm text-gray-500">
                Total route distance: {priceDetails.totalDistance.toFixed(2)} km
              </p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <TowMap />
        </Card>
      </div>
    </div>
  );
};

export default UserPage;