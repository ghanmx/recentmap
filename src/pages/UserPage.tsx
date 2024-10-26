import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TowMap from "@/components/TowMap";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { useToast } from "@/components/ui/use-toast";

const UserPage = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [priceDetails, setPriceDetails] = useState<{ totalPrice: number; totalDistance: number } | null>(null);
  const { toast } = useToast();

  const handleLocationSelect = (type: "pickup" | "drop", location: { lat: number; lng: number }) => {
    if (type === "pickup") {
      setPickupLocation(location);
      toast({
        title: "Pickup location updated",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    } else {
      setDropLocation(location);
      toast({
        title: "Drop location updated",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    }
  };

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
          <TowMap 
            onPickupSelect={(location) => handleLocationSelect("pickup", location)}
            onDropSelect={(location) => handleLocationSelect("drop", location)}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </Card>
      </div>
    </div>
  );
};

export default UserPage;