import { useEffect, useState } from "react";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { useToast } from "@/components/ui/use-toast";

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
            { lat: 26.510272, lng: -100.006323 }, // Enterprise location
            pickupLocation,
            dropLocation,
            'Toyota Corolla', // Default vehicle model
            false // Default maneuver requirement
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
    <div className="space-y-4">
      <div className="text-lg font-semibold">Estimated Price</div>
      <div className="text-3xl font-bold text-primary">
        ${priceDetails.totalPrice.toFixed(2)}
      </div>
      <p className="text-sm text-gray-500">
        Price is calculated based on actual road distance and service type
      </p>
      <p className="text-sm text-gray-500">
        Total route distance: {priceDetails.totalDistance.toFixed(2)} km
      </p>
    </div>
  );
};