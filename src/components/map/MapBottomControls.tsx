import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

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
  const hasLocations = pickupLocation && dropLocation;

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        className="w-full bg-gradient-to-r from-primary via-blue-600 to-primary hover:from-primary/90 
                 hover:to-primary/90 text-white shadow-lg hover:shadow-xl 
                 transition-all duration-300 py-4 sm:py-6 text-base sm:text-lg font-semibold
                 group relative overflow-hidden"
        onClick={onRequestTow}
        disabled={!hasLocations}
        aria-label="Request tow truck service"
      >
        <span className="absolute inset-0 bg-white/10 transform -skew-x-12 
                     group-hover:translate-x-full transition-transform duration-700 ease-out" />
        <span className="relative flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="hidden sm:inline">Solicitar Grúa</span>
          <span className="sm:hidden">Solicitar</span>
        </span>
      </Button>
    </div>
  );
};