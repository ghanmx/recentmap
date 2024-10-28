import { Button } from "@/components/ui/button";
import { RouteDisplay } from "./RouteDisplay";

interface MapBottomControlsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  onRequestTow: () => void;
}

export const MapBottomControls = ({
  pickupLocation,
  dropLocation,
  onRequestTow
}: MapBottomControlsProps) => {
  return (
    <div className="absolute inset-x-0 bottom-6 z-30 px-6">
      <div className="max-w-2xl mx-auto space-y-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <RouteDisplay pickupLocation={pickupLocation} dropLocation={dropLocation} />
        {pickupLocation && dropLocation && (
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 
                     hover:to-primary text-white shadow-lg hover:shadow-xl 
                     transition-all duration-300 py-6 text-lg font-semibold"
            onClick={onRequestTow}
          >
            Request Tow Truck
          </Button>
        )}
      </div>
    </div>
  );
};