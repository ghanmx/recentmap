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
    <div className="absolute inset-x-0 bottom-4 z-30 px-4">
      <div className="max-w-xl mx-auto space-y-4">
        <RouteDisplay pickupLocation={pickupLocation} dropLocation={dropLocation} />
        {pickupLocation && dropLocation && (
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 
                     hover:to-blue-700 text-white shadow-lg hover:shadow-xl 
                     transition-all duration-300"
            onClick={onRequestTow}
          >
            Request Tow Truck
          </Button>
        )}
      </div>
    </div>
  );
};