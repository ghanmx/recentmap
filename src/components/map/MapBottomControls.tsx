import { Button } from "@/components/ui/button";
import { RouteDisplay } from "./RouteDisplay";
import { Truck, ArrowRight } from "lucide-react";

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
    <div className="absolute inset-x-0 bottom-8 z-30 px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <RouteDisplay pickupLocation={pickupLocation} dropLocation={dropLocation} />
        {pickupLocation && dropLocation && (
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 
                     hover:to-primary text-white shadow-2xl hover:shadow-2xl 
                     transition-all duration-300 py-8 text-xl font-bold
                     group relative overflow-hidden rounded-xl border-2 border-primary/20"
            onClick={onRequestTow}
          >
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative flex items-center justify-center gap-3">
              <Truck className="w-6 h-6" />
              Request Tow Truck
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};