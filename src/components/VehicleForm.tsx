import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { VehicleSelector } from "./form/VehicleSelector";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { LocationSelector } from "./form/LocationSelector";
import { FormData, formSchema } from "@/types/form";
import { Card } from "./ui/card";
import { useTowing } from "@/contexts/TowingContext";

interface VehicleFormProps {
  pickupLocation?: { lat: number; lng: number } | null;
  dropLocation?: { lat: number; lng: number } | null;
  pickupAddress?: string;
  dropAddress?: string;
  serviceType?: string;
  onManeuverChange?: () => void;
  onVehicleModelChange?: () => void;
  onPickupSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onSelectingPickup?: (selecting: boolean) => void;
  onSelectingDrop?: (selecting: boolean) => void;
}

export const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  serviceType = "standard",
  onManeuverChange,
  onVehicleModelChange,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop
}: VehicleFormProps) => {
  const { updateSelectedVehicleModel, updateTruckType } = useTowing();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleModel: "",
      truckType: "A",
      issueDescription: "",
    },
  });

  const handleVehicleModelChange = (value: string) => {
    form.setValue("vehicleModel", value);
    updateSelectedVehicleModel(value);
    onVehicleModelChange?.();
  };

  const handleTruckTypeChange = (value: "A" | "B" | "C" | "D") => {
    form.setValue("truckType", value);
    updateTruckType(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <Card className="p-6">
          <VehicleSelector 
            form={form} 
            onVehicleModelChange={handleVehicleModelChange}
          />
        </Card>

        <Card className="p-6">
          <TowTruckSelector
            form={form}
            selectedModel={form.watch("vehicleModel")}
            onTruckTypeChange={handleTruckTypeChange}
          />
        </Card>

        <Card className="p-6">
          <LocationSelector 
            form={form}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            onPickupSelect={onPickupSelect}
            onDropSelect={onDropSelect}
            onSelectingPickup={onSelectingPickup}
            onSelectingDrop={onSelectingDrop}
          />
        </Card>
      </form>
    </Form>
  );
};