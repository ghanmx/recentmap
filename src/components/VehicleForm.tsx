import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";
import { VehicleFormHeader } from "./form/VehicleFormHeader";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { AddressFields } from "./form/AddressFields";
import { FormCostSummary } from "./form/FormCostSummary";
import { useState, useEffect } from "react";
import { TowTruckType } from "@/utils/downloadUtils";
import { useTowingCost } from "@/hooks/useTowingCost";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { CreditCard, Copy, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { detectTollsOnRoute } from "@/utils/tollCalculator";
import { motion } from "framer-motion";

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
  onSelectingPickup: (selecting: boolean) => void;
  onSelectingDrop: (selecting: boolean) => void;
}) => {
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
        <div className="flex justify-between items-center mb-6">
          <VehicleFormHeader />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="ml-2 transition-all duration-300 hover:bg-primary/10 active:scale-95"
                >
                  {isCopied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copiar datos del formulario</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

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

            <FormCostSummary 
              tollFees={tollFees}
              estimatedCost={costDetails?.totalCost || 0}
            />

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
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
                    <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
};

export default VehicleForm;