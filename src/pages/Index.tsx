import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import TowMap from "@/components/TowMap";
import VehicleForm from "@/components/VehicleForm";
import { ServiceRequest } from "@/types/service";
import { FloatingPanel } from "@/components/map/FloatingPanel";

const Index = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [serviceType, setServiceType] = useState<ServiceRequest['serviceType']>('standard');
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleLocationSelect = (type: "pickup" | "drop", location: { lat: number; lng: number }) => {
    if (type === "pickup") {
      setPickupLocation(location);
      toast({
        title: "Pickup location selected",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    } else {
      setDropLocation(location);
      toast({
        title: "Drop location selected",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
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
            />
          </Card>
        </FloatingPanel>
      )}
    </div>
  );
};

export default Index;