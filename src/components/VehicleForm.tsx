import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { VehicleSelector } from "./form/VehicleSelector";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { LocationSelector } from "./form/LocationSelector";
import { CostEstimation } from "./CostEstimation";
import { FormData, formSchema } from "@/types/form";
import { TowingWrapper } from './TowingWrapper';
import { Card } from "./ui/card";

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
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleModel: "",
      truckType: "A",
      issueDescription: "",
    },
  });

  return (
    <TowingWrapper>
      <Form {...form}>
        <form className="space-y-8">
          <Card className="p-6">
            <VehicleSelector form={form} />
          </Card>

          <Card className="p-6">
            <TowTruckSelector
              form={form}
              selectedModel={form.watch("vehicleModel")}
            />
          </Card>

          <Card className="p-6">
            <LocationSelector form={form} />
          </Card>

          <CostEstimation />
        </form>
      </Form>
    </TowingWrapper>
  );
};