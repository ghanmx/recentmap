import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Copy } from "lucide-react";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";
import { DownloadButtons } from "./form/DownloadButtons";
import { downloadServiceInfo, FormData } from "@/utils/downloadUtils";
import { Input } from "./ui/input";

const formSchema = z.object({
  username: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  vehicleMake: z.string().min(1, "Brand is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  vehicleYear: z.string()
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits")
    .refine((val) => {
      const year = parseInt(val);
      return year >= 1900 && year <= new Date().getFullYear() + 1;
    }, "Invalid year"),
  vehicleColor: z.string().min(1, "Color is required"),
  issueDescription: z.string().min(10, "Please provide more details about the issue"),
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
        formData as FormData,
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
        duration: 3000,
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
      serviceType,
      pickupLocation,
      dropLocation,
      requiresManeuver
    };

    submitRequest(serviceRequest);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg backdrop-blur-sm animate-fade-in hover:shadow-xl transition-all duration-300">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <VehicleDetails
            onBrandChange={(brand) => form.setValue('vehicleMake', brand)}
            onModelChange={(model) => {
              form.setValue('vehicleModel', model);
              onVehicleModelChange?.(model);
            }}
            onYearChange={(year) => form.setValue('vehicleYear', year)}
            onColorChange={(color) => form.setValue('vehicleColor', color)}
          />

          <ServiceRequirements
            form={form}
            requiresManeuver={requiresManeuver}
            onManeuverChange={handleManeuverChange}
          />

          <div className="flex gap-4">
            <DownloadButtons onDownload={handleDownload} />
            
            <Button
              type="button"
              variant="outline"
              onClick={copyToClipboard}
              className="flex-1 bg-white hover:bg-gray-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar Info
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPending ? (
                "Processing..."
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Continue to Payment
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default VehicleForm;