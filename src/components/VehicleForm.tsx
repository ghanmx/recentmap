import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";
import { VehicleFormHeader } from "./form/VehicleFormHeader";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { AddressFields } from "./form/AddressFields";
import { useState, useEffect } from "react";
import { TowTruckType } from "@/utils/downloadUtils";
import { useTowingCost } from "@/hooks/useTowingCost";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { CreditCard, Copy } from "lucide-react";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { CopyButton } from "./ui/copy-button";

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

  useEffect(() => {
    const updateAddresses = async () => {
      if (pickupLocation && !pickupAddress) {
        const address = await getAddressFromCoordinates(pickupLocation.lat, pickupLocation.lng);
        onPickupSelect({ ...pickupLocation, address });
      }
      if (dropLocation && !dropAddress) {
        const address = await getAddressFromCoordinates(dropLocation.lat, dropLocation.lng);
        onDropSelect({ ...dropLocation, address });
      }
    };

    updateAddresses();
  }, [pickupLocation, dropLocation, pickupAddress, dropAddress, onPickupSelect, onDropSelect]);

  const getFormData = () => {
    const data = {
      pickup: pickupAddress,
      dropoff: dropAddress,
      vehicleMake: form.getValues('vehicleMake'),
      vehicleModel: form.getValues('vehicleModel'),
      vehicleYear: form.getValues('vehicleYear'),
      vehicleColor: form.getValues('vehicleColor'),
      requiresManeuver,
      truckType,
      tollFees,
      estimatedCost: costDetails?.totalCost || 0
    };
    return JSON.stringify(data, null, 2);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <VehicleFormHeader />
          <CopyButton
            text={getFormData()}
            onCopy={() => {
              toast({
                title: "Form Data Copied",
                description: "The form data has been copied to your clipboard",
              });
            }}
            className="ml-2"
          />
        </div>
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
            
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold group relative overflow-hidden"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Procesando Solicitud...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  Continuar al Pago
                </span>
              )}
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default VehicleForm;