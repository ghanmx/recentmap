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
  const [serviceType, setServiceType] = useState<ServiceRequest['serviceType']>('standard');
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>('');
  const [totalCost, setTotalCost] = useState(0);
  const { toast } = useToast();

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

  return (
    <div className="relative h-screen flex">
      <div className="w-full lg:w-[450px] h-screen overflow-y-auto bg-white/95 backdrop-blur-sm border-r shadow-lg z-10">
        <div className="p-4">
          <VehicleForm
            pickupLocation={null}
            dropLocation={null}
            pickupAddress=""
            dropAddress=""
            serviceType={serviceType}
            onManeuverChange={setRequiresManeuver}
            onVehicleModelChange={setSelectedVehicleModel}
            onPickupSelect={() => {}}
            onDropSelect={() => {}}
          />
        </div>
      </div>
      <div className="flex-1 relative">
        <TowMap />
      </div>
    </div>
  );
};

export default Index;