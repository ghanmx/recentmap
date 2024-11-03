import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";
import { VehicleFormHeader } from "./form/VehicleFormHeader";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { AddressFields } from "./form/AddressFields";
import { useState } from "react";
import { TowTruckType } from "@/utils/downloadUtils";
import { useTowingCost } from "@/hooks/useTowingCost";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Download, Copy, CreditCard } from "lucide-react";
import { downloadServiceInfo } from "@/utils/downloadUtils";

const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  serviceType,
  onManeuverChange,
  onVehicleModelChange,
  onPickupSelect,
  onDropSelect
}: {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  serviceType: 'standard' | 'flatbed' | 'emergency';
  onManeuverChange?: (requiresManeuver: boolean) => void;
  onVehicleModelChange?: (model: string) => void;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
}) => {
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [truckType, setTruckType] = useState<TowTruckType>('A');
  const [tollFees, setTollFees] = useState(0);
  const [selectedModel, setSelectedModel] = useState('');
  const { toast } = useToast();
  const { form, onSubmit, isPending } = useVehicleForm(pickupLocation, dropLocation, serviceType);
  const costDetails = useTowingCost(pickupLocation, dropLocation, requiresManeuver, truckType, tollFees);

  const generateFormDataText = () => {
    const formData = form.getValues();
    return `
Usuario: ${formData.username}
Vehículo: ${formData.vehicleMake} ${formData.vehicleModel} ${formData.vehicleYear}
Color: ${formData.vehicleColor}
Tipo de Grúa: ${formData.truckType}
Casetas: $${tollFees}
Descripción: ${formData.issueDescription}
Ubicación de recogida: ${pickupLocation ? `${pickupLocation.lat}, ${pickupLocation.lng}` : 'No especificada'}
Ubicación de entrega: ${dropLocation ? `${dropLocation.lat}, ${dropLocation.lng}` : 'No especificada'}
Tipo de servicio: ${serviceType}
Requiere maniobra especial: ${requiresManeuver ? 'Sí' : 'No'}
    `.trim();
  };

  const handleDownload = async (format: 'csv' | 'txt') => {
    if (!form.formState.isValid) {
      toast({
        title: "Información Incompleta",
        description: "Por favor complete todos los campos requeridos antes de descargar.",
        variant: "destructive",
      });
      return;
    }

    const formData = form.getValues();
    await downloadServiceInfo(
      format,
      formData,
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateFormDataText());
      toast({
        title: "Información Copiada",
        description: "Los detalles del servicio han sido copiados al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
        <VehicleFormHeader />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AddressFields
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              pickupAddress={pickupAddress}
              dropAddress={dropAddress}
              onPickupSelect={onPickupSelect}
              onDropSelect={onDropSelect}
              onTollUpdate={setTollFees}
            />
            <VehicleDetails
              onBrandChange={(brand) => form.setValue('vehicleMake', brand)}
              onModelChange={(model) => {
                form.setValue('vehicleModel', model);
                setSelectedModel(model);
                onVehicleModelChange?.(model);
              }}
              onYearChange={(year) => form.setValue('vehicleYear', Number(year))}
              onColorChange={(color) => form.setValue('vehicleColor', color)}
            />
            <TowTruckSelector
              form={form}
              onTruckTypeChange={setTruckType}
              onTollFeesChange={setTollFees}
              selectedModel={selectedModel}
            />
            <ServiceRequirements
              form={form}
              requiresManeuver={requiresManeuver}
              onManeuverChange={(checked) => {
                setRequiresManeuver(checked);
                onManeuverChange?.(checked);
              }}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDownload('txt')}
                className="flex-1 bg-white hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar Detalles
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="flex-1 bg-white hover:bg-gray-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar al Portapapeles
              </Button>
              
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Procesando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Continuar al Pago
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default VehicleForm;