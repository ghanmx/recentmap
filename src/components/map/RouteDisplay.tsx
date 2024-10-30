import { useEffect, useState } from "react";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Truck, Route, DollarSign } from "lucide-react";

interface RouteDisplayProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

interface PriceDetails {
  totalPrice: number;
  totalDistance: number;
  towTruckType: "A" | "C" | "D";
  routeGeometry: {
    companyToPickup: string;
    pickupToDrop: string;
  };
}

export const RouteDisplay = ({ pickupLocation, dropLocation }: RouteDisplayProps) => {
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const updatePrice = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const result = await calculateTowingPrice(
            pickupLocation,
            dropLocation,
            'Toyota Corolla',
            false
          );
          setPriceDetails(result);
        } catch (error) {
          toast({
            title: "Error calculating price",
            description: "Failed to calculate route and price. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    updatePrice();
  }, [pickupLocation, dropLocation, toast]);

  if (!priceDetails) return null;

  return (
    <Card className="p-8 space-y-6 bg-gradient-to-br from-white to-blue-50 backdrop-blur-md shadow-2xl border-2 border-blue-200 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="bg-primary/15 p-3 rounded-xl shadow-inner">
          <DollarSign className="w-6 h-6 text-primary" />
        </div>
        <div className="text-xl font-bold text-gray-900">Estimated Price</div>
      </div>
      
      <div className="text-5xl font-bold text-primary bg-primary/10 p-6 rounded-xl flex items-center gap-4 shadow-inner">
        <span>${priceDetails.totalPrice.toFixed(2)}</span>
        <span className="text-base font-semibold text-gray-700 bg-white/80 px-4 py-2 rounded-full shadow-sm">
          Fixed Price
        </span>
      </div>

      <div className="space-y-4 divide-y-2 divide-gray-100">
        <div className="flex items-center gap-4 py-4">
          <div className="bg-blue-50 p-3 rounded-xl shadow-inner">
            <Route className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-700">Total Distance</p>
            <p className="text-2xl font-bold text-primary">
              {priceDetails.totalDistance.toFixed(2)} km
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 py-4">
          <div className="bg-blue-50 p-3 rounded-xl shadow-inner">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-700">Service Type</p>
            <p className="text-2xl font-bold text-primary">
              Type {priceDetails.towTruckType} Tow Truck
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200 shadow-inner">
        <p className="text-base font-semibold text-blue-800">
          Price includes all service fees and taxes. No hidden charges.
        </p>
      </div>
    </Card>
  );
};