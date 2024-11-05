import { LocationSearch } from "./LocationSearch";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { detectTollsOnRoute } from "@/utils/tollCalculator";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface AddressFieldsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
  onTollUpdate?: (tollCost: number) => void;
  onSelectingPickup: (selecting: boolean) => void;
  onSelectingDrop: (selecting: boolean) => void;
  className?: string;
}

export const AddressFields = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onTollUpdate,
  onSelectingPickup,
  onSelectingDrop,
  className = ""
}: AddressFieldsProps) => {
  const { toast } = useToast();

  const handleLocationSelect = async (location: { lat: number; lng: number }, type: 'pickup' | 'drop') => {
    try {
      const address = await getAddressFromCoordinates(location.lat, location.lng);
      if (type === 'pickup') {
        onPickupSelect({ ...location, address });
        onSelectingPickup(false);
      } else {
        onDropSelect({ ...location, address });
        onSelectingDrop(false);
      }

      if (pickupLocation && dropLocation) {
        const tollInfo = await detectTollsOnRoute(
          type === 'pickup' ? location : pickupLocation,
          type === 'drop' ? location : dropLocation
        );
        onTollUpdate?.(tollInfo.totalTollCost);
        
        if (tollInfo.tolls.length > 0) {
          toast({
            title: "Peajes detectados",
            description: `Se han detectado ${tollInfo.tolls.length} peajes en la ruta`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar la ubicación",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className={`p-6 space-y-6 bg-gradient-to-br from-white/95 to-blue-50/95 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-lg text-gray-800">Punto de Recogida</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectingPickup(true)}
              className="text-sm hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <MapPin className="h-4 w-4 mr-2 text-green-500" />
              Seleccionar en Mapa
            </Button>
          </div>
          <LocationSearch
            label=""
            placeholder="Ingrese dirección de recogida"
            currentAddress={pickupAddress}
            currentLocation={pickupLocation}
            onLocationSelect={(loc) => handleLocationSelect(loc, 'pickup')}
            icon={<MapPin className="h-4 w-4 text-green-500" />}
          />
          {pickupLocation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-gray-500 flex items-center gap-1.5 bg-gray-50/80 p-2 rounded-md"
            >
              <MapPin className="h-3 w-3" />
              <span className="font-mono">
                {pickupLocation.lat.toFixed(6)}, {pickupLocation.lng.toFixed(6)}
              </span>
            </motion.div>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <div className="relative">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-lg text-gray-800">Punto de Entrega</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectingDrop(true)}
              className="text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Navigation className="h-4 w-4 mr-2 text-red-500" />
              Seleccionar en Mapa
            </Button>
          </div>
          <LocationSearch
            label=""
            placeholder="Ingrese dirección de entrega"
            currentAddress={dropAddress}
            currentLocation={dropLocation}
            onLocationSelect={(loc) => handleLocationSelect(loc, 'drop')}
            icon={<Navigation className="h-4 w-4 text-red-500" />}
          />
          {dropLocation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-gray-500 flex items-center gap-1.5 bg-gray-50/80 p-2 rounded-md"
            >
              <Navigation className="h-3 w-3" />
              <span className="font-mono">
                {dropLocation.lat.toFixed(6)}, {dropLocation.lng.toFixed(6)}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Card>
  );
};