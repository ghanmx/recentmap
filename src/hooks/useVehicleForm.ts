import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, vehicleFormSchema } from "@/types/form";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { useToast } from "@/hooks/use-toast";

interface Location {
  lat: number;
  lng: number;
}

export const useVehicleForm = (
  pickupLocation: Location | null,
  dropLocation: Location | null,
  serviceType: 'standard' | 'flatbed' | 'emergency'
) => {
  const { toast } = useToast();
  const { mutate: submitRequest, isPending } = useServiceRequest();

  const form = useForm<FormData>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      username: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      issueDescription: "",
      truckType: "A",
      tollFees: 0,
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Missing Location",
        description: "Please select both pickup and drop-off locations",
        variant: "destructive",
      });
      return;
    }

    const serviceRequest = {
      username: data.username,
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleYear: data.vehicleYear,
      vehicleColor: data.vehicleColor,
      issueDescription: data.issueDescription,
      truckType: data.truckType,
      tollFees: data.tollFees,
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver: false,
    };

    submitRequest(serviceRequest);
  };

  return {
    form,
    onSubmit,
    isPending
  };
};