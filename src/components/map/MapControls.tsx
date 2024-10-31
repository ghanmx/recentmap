import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface MapControlsProps {
  selectingPickup: boolean;
  selectingDrop: boolean;
  onPickupClick: () => void;
  onDropClick: () => void;
}

export const MapControls = ({ 
  selectingPickup, 
  selectingDrop, 
  onPickupClick, 
  onDropClick 
}: MapControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        variant={selectingPickup ? "secondary" : "outline"}
        onClick={onPickupClick}
        className="flex-1 flex items-center justify-center gap-3 h-14 text-base font-medium 
                 bg-white hover:bg-primary/10 shadow-sm"
      >
        <MapPin className="w-5 h-5" />
        Seleccionar Punto de Recogida
      </Button>
      <Button 
        variant={selectingDrop ? "secondary" : "outline"}
        onClick={onDropClick}
        className="flex-1 flex items-center justify-center gap-3 h-14 text-base font-medium
                 bg-white hover:bg-primary/10 shadow-sm"
      >
        <Navigation className="w-5 h-5" />
        Seleccionar Punto de Entrega
      </Button>
    </div>
  );
};