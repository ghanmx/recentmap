import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, formSchema } from "@/types/form";
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleModel: "",
      truckType: "A",
      issueDescription: "",
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

    submitRequest({
      username: "guest", // Default value
      vehicleMake: "Unknown", // Default value
      vehicleModel: data.vehicleModel,
      vehicleYear: new Date().getFullYear(), // Default current year
      vehicleColor: "Unknown", // Default value
      truckType: data.truckType,
      issueDescription: data.issueDescription || "",
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver: false,
      tollFees: 0, // Default value
    });
  };

  return {
    form,
    onSubmit,
    isPending
  };
};