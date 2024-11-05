import { Button } from "@/components/ui/button";
import { MapControls } from "./MapControls";
import { RouteStreetInfo } from "./RouteStreetInfo";
import { showLocationNotification } from "@/utils/notificationUtils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface MapControlPanelProps {
  selectingPickup: boolean;
  selectingDrop: boolean;
  setSelectingPickup: (value: boolean) => void;
  setSelectingDrop: (value: boolean) => void;
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const MapControlPanel = ({
  selectingPickup,
  selectingDrop,
  setSelectingPickup,
  setSelectingDrop,
  pickupLocation,
  dropLocation,
}: MapControlPanelProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 sm:px-6 flex flex-col items-center gap-6 pointer-events-auto max-w-3xl mx-auto w-full"
    >
      <Card className="w-full bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-6 border-blue-100/50 hover:shadow-xl transition-all duration-300">
        <MapControls 
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onPickupClick={() => {
            setSelectingPickup(true);
            setSelectingDrop(false);
            showLocationNotification('pickup');
            toast({
              title: "Seleccionando punto de recogida",
              description: "Haz clic en el mapa para seleccionar el punto de recogida.",
            });
          }}
          onDropClick={() => {
            setSelectingDrop(true);
            setSelectingPickup(false);
            showLocationNotification('drop');
            toast({
              title: "Seleccionando punto de entrega",
              description: "Haz clic en el mapa para seleccionar el punto de entrega.",
            });
          }}
        />
      </Card>
      
      {(pickupLocation || dropLocation) && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <RouteStreetInfo 
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </motion.div>
      )}
    </motion.div>
  );
};