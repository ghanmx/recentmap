import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";
import { downloadServiceInfo } from "@/utils/downloadUtils";
import { VehicleFormHeader } from "./form/VehicleFormHeader";
import { VehicleFormActions } from "./form/VehicleFormActions";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { useState } from "react";
import { TowTruckType } from "@/utils/downloadUtils";

const formSchema = z.object({
  username: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  vehicleMake: z.string().min(1, "Brand is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  vehicleYear: z.string().min(4, "Year must be 4 digits"),
  vehicleColor: z.string().min(1, "Color is required"),
  issueDescription: z.string().min(10, "Please provide more details about the issue"),
  truckType: z.enum(["A", "B", "C", "D"]),
  tollFees: z.number().min(0, "Toll fees cannot be negative"),
});

type FormValues = z.infer<typeof formSchema>;

interface VehicleFormProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  serviceType: ServiceRequest['serviceType'];
  onManeuverChange?: (requiresManeuver: boolean) => void;
  onVehicleModelChange?: (model: string) => void;
}

const VehicleForm = ({
  pickupLocation,
  dropLocation,
  serviceType,
  onManeuverChange,
  onVehicleModelChange
}: VehicleFormProps) => {
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [truckType, setTruckType] = useState<TowTruckType>('A');
  const [tollFees, setTollFees] = useState(0);
  const { toast } = useToast();
  const { mutate: submitRequest, isPending } = useServiceRequest();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      issueDescription: "",
      truckType: "A",
      tollFees: 0,
    },
  });

  const handleManeuverChange = (checked: boolean) => {
    setRequiresManeuver(checked);
    onManeuverChange?.(checked);
  };

  const handleDownload = async (format: 'csv' | 'txt') => {
    const formData = form.getValues();
    if (formData.vehicleMake && formData.vehicleModel && formData.vehicleYear && 
        formData.vehicleColor && formData.issueDescription) {
      await downloadServiceInfo(
        format,
        formData,
        pickupLocation,
        dropLocation,
        serviceType,
        requiresManeuver
      );
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all vehicle details before downloading.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    const formData = form.getValues();
    const clipboardText = `
Usuario: ${formData.username}
Vehículo: ${formData.vehicleMake} ${formData.vehicleModel} ${formData.vehicleYear}
Color: ${formData.vehicleColor}
Tipo de Grúa: ${formData.truckType}
Casetas: $${formData.tollFees}
Descripción: ${formData.issueDescription}
Ubicación de recogida: ${pickupLocation ? `${pickupLocation.lat}, ${pickupLocation.lng}` : 'No especificada'}
Ubicación de entrega: ${dropLocation ? `${dropLocation.lat}, ${dropLocation.lng}` : 'No especificada'}
Tipo de servicio: ${serviceType}
Requiere maniobra especial: ${requiresManeuver ? 'Sí' : 'No'}
    `.trim();

    try {
      await navigator.clipboard.writeText(clipboardText);
      toast({
        title: "Información copiada",
        description: "Los detalles del servicio se han copiado al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Missing Location",
        description: "Please select both pickup and drop-off locations",
        variant: "destructive",
      });
      return;
    }

    const serviceRequest: ServiceRequest = {
      ...data,
      vehicleYear: parseInt(data.vehicleYear),
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver,
      status: 'pending'
    };

    submitRequest(serviceRequest);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
      <VehicleFormHeader />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <VehicleDetails
            onBrandChange={(brand) => form.setValue('vehicleMake', brand)}
            onModelChange={(model) => {
              form.setValue('vehicleModel', model);
              onVehicleModelChange?.(model);
            }}
            onYearChange={(year) => form.setValue('vehicleYear', year)}
            onColorChange={(color) => form.setValue('vehicleColor', color)}
          />

          <TowTruckSelector
            form={form}
            onTruckTypeChange={setTruckType}
            onTollFeesChange={setTollFees}
          />

          <ServiceRequirements
            form={form}
            requiresManeuver={requiresManeuver}
            onManeuverChange={handleManeuverChange}
          />

          <VehicleFormActions
            onDownload={handleDownload}
            onCopy={copyToClipboard}
            onSubmit={() => form.handleSubmit(onSubmit)}
            isPending={isPending}
          />
        </form>
      </Form>
    </Card>
  );
};

export default VehicleForm;