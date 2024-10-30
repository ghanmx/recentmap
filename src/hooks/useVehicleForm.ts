import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFormSchema, VehicleFormValues, FormData } from "@/types/form";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { useToast } from "@/hooks/use-toast";

export const useVehicleForm = (
  pickupLocation: { lat: number; lng: number } | null,
  dropLocation: { lat: number; lng: number } | null,
  serviceType: ServiceRequest['serviceType']
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

    const serviceRequest: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'> = {
      username: data.username,
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleYear: parseInt(data.vehicleYear),
      vehicleColor: data.vehicleColor,
      issueDescription: data.issueDescription,
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver: false,
      truckType: data.truckType,
      tollFees: data.tollFees,
    };

    submitRequest(serviceRequest);
  };

  return {
    form,
    onSubmit,
    isPending
  };
};