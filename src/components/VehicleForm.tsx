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

export const VehicleForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleModel: "",
      truckType: "A",
      pickupLocation: undefined,
      dropoffLocation: undefined,
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
