import { useEffect, useState } from "react";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

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
            { lat: 26.510272, lng: -100.006323 },
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
    <Card className="p-6 space-y-4 bg-white/95 backdrop-blur-md shadow-xl border border-gray-200">
      <div className="text-lg font-semibold text-gray-900">Estimated Price</div>
      <div className="text-3xl font-bold text-primary bg-primary/5 p-3 rounded-lg">
        ${priceDetails.totalPrice.toFixed(2)}
      </div>
      <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-700">
          Price is calculated based on actual road distance and service type
        </p>
        <p className="text-sm text-gray-700 font-medium">
          Total route distance: {priceDetails.totalDistance.toFixed(2)} km
        </p>
      </div>
    </Card>
  );
};