import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import TowMap from "@/components/TowMap";
import VehicleForm from "@/components/VehicleForm";
import { ServiceRequest } from "@/types/service";
import { FloatingPanel } from "@/components/map/FloatingPanel";
import { calculateTotalCost, getTowTruckType } from "@/utils/towTruckPricing";

const Index = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [serviceType, setServiceType] = useState<ServiceRequest['serviceType']>('standard');
  const [showForm, setShowForm] = useState(false);
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

  const updatePrice = (pickup: { lat: number; lng: number } | null, drop: { lat: number; lng: number } | null) => {
    if (pickup && drop && selectedVehicleModel) {
      const towTruckType = getTowTruckType(selectedVehicleModel);
      const distance = calculateDistance(pickup, drop); // You'll need to implement this
      const cost = calculateTotalCost(distance, towTruckType, requiresManeuver);
      setTotalCost(cost);
    }
  };

  const handleManeuverChange = (maneuver: boolean) => {
    setRequiresManeuver(maneuver);
    if (pickupLocation && dropLocation && selectedVehicleModel) {
      const towTruckType = getTowTruckType(selectedVehicleModel);
      const distance = calculateDistance(pickupLocation, dropLocation);
      const cost = calculateTotalCost(distance, towTruckType, maneuver);
      setTotalCost(cost);
    }
  };

  const handleVehicleModelChange = (model: string) => {
    setSelectedVehicleModel(model);
    if (pickupLocation && dropLocation) {
      const towTruckType = getTowTruckType(model);
      const distance = calculateDistance(pickupLocation, dropLocation);
      const cost = calculateTotalCost(distance, towTruckType, requiresManeuver);
      setTotalCost(cost);
    }
  };

  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number => {
    // Simple distance calculation (you might want to use a more accurate method)
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="relative h-screen">
      <TowMap 
        onPickupSelect={(location) => handleLocationSelect("pickup", location)}
        onDropSelect={(location) => handleLocationSelect("drop", location)}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
      />

      <Button
        className="fixed top-4 right-4 z-[1001]"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Show Form"}
      </Button>

      {showForm && (
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
      )}
    </div>
  );
};

export default Index;