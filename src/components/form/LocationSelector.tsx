import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { LocationSearch } from "./LocationSearch";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTowing } from "@/contexts/TowingContext";
import { Card } from "@/components/ui/card";

export interface LocationSelectorProps {
  form: UseFormReturn<FormData>;
  pickupLocation?: { lat: number; lng: number } | null;
  dropLocation?: { lat: number; lng: number } | null;
  pickupAddress?: string;
  dropAddress?: string;
  onPickupSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onSelectingPickup?: (selecting: boolean) => void;
  onSelectingDrop?: (selecting: boolean) => void;
}

export const LocationSelector = ({
  form,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop
}: LocationSelectorProps) => {
  const { toast } = useToast();
  const { updateLocation } = useTowing();

  const handleLocationUpdate = (location: { lat: number; lng: number; address: string }, type: 'pickup' | 'drop') => {
    updateLocation(type, location);
    const handler = type === 'pickup' ? onPickupSelect : onDropSelect;
    handler?.(location);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={() => (
              <FormItem className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-green-500 rounded-r-full" />
                <div className="pl-6">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <MapPin className="h-5 w-5 text-green-500" />
                    Punto de Recogida
                  </FormLabel>
                  <FormControl>
                    <LocationSearch
                      label="Ubicación de Recogida"
                      placeholder="¿Dónde está tu vehículo?"
                      icon={<MapPin className="h-4 w-4 text-green-500" />}
                      currentAddress={pickupAddress}
                      currentLocation={pickupLocation}
                      onLocationSelect={(loc) => handleLocationUpdate(loc, 'pickup')}
                      type="pickup"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-gray-200" />
          </div>

          <FormField
            control={form.control}
            name="dropoffLocation"
            render={() => (
              <FormItem className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-blue-500 rounded-r-full" />
                <div className="pl-6">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <Navigation className="h-5 w-5 text-blue-500" />
                    Punto de Entrega
                  </FormLabel>
                  <FormControl>
                    <LocationSearch
                      label="Ubicación de Entrega"
                      placeholder="¿A dónde llevamos tu vehículo?"
                      icon={<Navigation className="h-4 w-4 text-blue-500" />}
                      currentAddress={dropAddress}
                      currentLocation={dropLocation}
                      onLocationSelect={(loc) => handleLocationUpdate(loc, 'drop')}
                      type="drop"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Card>
    </motion.div>
  );
};