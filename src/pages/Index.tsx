import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import TowMap from "@/components/TowMap";
import VehicleForm from "@/components/VehicleForm";
import { ServiceRequest } from "@/types/service";
import { FloatingPanel } from "@/components/map/FloatingPanel";
import { calculateTotalCost, getTowTruckType } from "@/utils/towTruckPricing";
import { calculateRoadDistance } from "@/utils/routeCalculator";

const Index = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [serviceType, setServiceType] = useState<ServiceRequest['serviceType']>('standard');
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>('');
  const [totalCost, setTotalCost] = useState(0);
  const { toast } = useToast();

  const handleLocationSelect = (type: "pickup" | "drop", location: { lat: number; lng: number }) => {
    if (type === "pickup") {
      setPickupLocation(location);
      updatePrice(location, dropLocation);
      toast({
        title: "Pickup location selected",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    } else {
      setDropLocation(location);
      updatePrice(pickupLocation, location);
      toast({
        title: "Drop location selected",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    }
  };

  const updatePrice = async (pickup: { lat: number; lng: number } | null, drop: { lat: number; lng: number } | null) => {
    if (pickup && drop && selectedVehicleModel) {
      try {
        const towTruckType = getTowTruckType(selectedVehicleModel);
        const distance = await calculateRoadDistance(pickup, drop);
        const cost = calculateTotalCost(distance, towTruckType, requiresManeuver);
        setTotalCost(cost);
      } catch (error) {
        console.error('Error updating price:', error);
        toast({
          title: "Error calculating route",
          description: "Failed to calculate accurate route distance. Using approximate distance.",
          variant: "destructive"
        });
      }
    }
  };

  const handleManeuverChange = (maneuver: boolean) => {
    setRequiresManeuver(maneuver);
    if (pickupLocation && dropLocation && selectedVehicleModel) {
      const towTruckType = getTowTruckType(selectedVehicleModel);
      updatePrice(pickupLocation, dropLocation);
    }
  };

  const handleVehicleModelChange = (model: string) => {
    setSelectedVehicleModel(model);
    if (pickupLocation && dropLocation) {
      const towTruckType = getTowTruckType(model);
      updatePrice(pickupLocation, dropLocation);
    }
  };

  return (
    <div className="relative h-screen">
      <TowMap 
        onPickupSelect={(location) => handleLocationSelect("pickup", location)}
        onDropSelect={(location) => handleLocationSelect("drop", location)}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
      />

      <FloatingPanel className="right-4 top-20 w-96 ml-auto">
        <Card className="bg-transparent border-none shadow-none">
          <VehicleForm 
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            serviceType={serviceType}
            onManeuverChange={handleManeuverChange}
            onVehicleModelChange={handleVehicleModelChange}
          />
        </Card>
      </FloatingPanel>
    </div>
  );
};

export default Index;