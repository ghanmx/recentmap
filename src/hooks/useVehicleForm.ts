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
      vehicleModel: data.vehicleModel,
      truckType: data.truckType,
      issueDescription: data.issueDescription || "",
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver: false,
    });
  };

  return {
    form,
    onSubmit,
    isPending
  };
};