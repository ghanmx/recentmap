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
    <div className="flex gap-4">
      <Button 
        variant={selectingPickup ? "secondary" : "outline"}
        onClick={onPickupClick}
        className="flex items-center gap-2"
      >
        <MapPin className="w-4 h-4" />
        Select Pickup
      </Button>
      <Button 
        variant={selectingDrop ? "secondary" : "outline"}
        onClick={onDropClick}
        className="flex items-center gap-2"
      >
        <Navigation className="w-4 h-4" />
        Select Drop-off
      </Button>
    </div>
  );
};