import { Button } from "@/components/ui/button";

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
      >
        Select Pickup
      </Button>
      <Button 
        variant={selectingDrop ? "secondary" : "outline"}
        onClick={onDropClick}
      >
        Select Drop-off
      </Button>
    </div>
  );
};