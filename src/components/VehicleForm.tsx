import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { AddressFields } from "./form/AddressFields";
import { EnhancedFormHeader } from "./form/EnhancedFormHeader";
import { EnhancedFormActions } from "./form/EnhancedFormActions";
import { useState, useEffect } from "react";
import { TowTruckType } from "@/utils/downloadUtils";
import { useTowingCost } from "@/hooks/useTowingCost";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { detectTollsOnRoute } from "@/utils/tollCalculator";

interface VehicleFormProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  serviceType: 'standard' | 'flatbed' | 'emergency';
  onManeuverChange?: (requiresManeuver: boolean) => void;
  onVehicleModelChange?: (model: string) => void;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
  onSelectingPickup: (selecting: boolean) => void;
  onSelectingDrop: (selecting: boolean) => void;
}

const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  serviceType,
  onManeuverChange,
  onVehicleModelChange,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop
}: VehicleFormProps) => {
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [truckType, setTruckType] = useState<TowTruckType>('A');
  const [tollFees, setTollFees] = useState(0);
  const [selectedModel, setSelectedModel] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const { form, onSubmit, isPending } = useVehicleForm(pickupLocation, dropLocation, serviceType);
  const costDetails = useTowingCost(pickupLocation, dropLocation, requiresManeuver, truckType, tollFees);

  useEffect(() => {
    const updateTollFees = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const tollInfo = await detectTollsOnRoute(pickupLocation, dropLocation);
          setTollFees(tollInfo.totalTollCost);
          form.setValue('tollFees', tollInfo.totalTollCost);
        } catch (error) {
          console.error('Error calculating toll fees:', error);
        }
      }
    };

    updateTollFees();
  }, [pickupLocation, dropLocation]);

  const handleCopy = async () => {
    const formData = {
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
    
    await navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setIsCopied(true);
    toast({
      title: "Datos copiados",
      description: "La información del formulario ha sido copiada al portapapeles",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <EnhancedFormHeader />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AddressFields
                pickupLocation={pickupLocation}
                dropLocation={dropLocation}
                pickupAddress={pickupAddress}
                dropAddress={dropAddress}
                onPickupSelect={onPickupSelect}
                onDropSelect={onDropSelect}
                onTollUpdate={setTollFees}
                onSelectingPickup={onSelectingPickup}
                onSelectingDrop={onSelectingDrop}
                className="mb-6"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TowTruckSelector
                form={form}
                onTruckTypeChange={setTruckType}
                onTollFeesChange={setTollFees}
                selectedModel={selectedModel}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ServiceRequirements
                form={form}
                requiresManeuver={requiresManeuver}
                onManeuverChange={(checked) => {
                  setRequiresManeuver(checked);
                  onManeuverChange?.(checked);
                }}
              />
            </motion.div>

            <EnhancedFormActions
              onCopy={handleCopy}
              isCopied={isCopied}
              isPending={isPending}
            />
          </form>
        </Form>
      </Card>
    </motion.div>
  );
};

export default VehicleForm;