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
    <div className="flex flex-col sm:flex-row gap-3">
      <Button 
        variant={selectingPickup ? "secondary" : "outline"}
        onClick={onPickupClick}
        className="flex-1 flex items-center justify-center gap-2 h-12 text-base"
      >
        <MapPin className="w-5 h-5" />
        Select Pickup
      </Button>
      <Button 
        variant={selectingDrop ? "secondary" : "outline"}
        onClick={onDropClick}
        className="flex-1 flex items-center justify-center gap-2 h-12 text-base"
      >
        <Navigation className="w-5 h-5" />
        Select Drop-off
      </Button>
    </div>
  );
};