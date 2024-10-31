import { Button } from "@/components/ui/button";
import { RouteDisplay } from "./RouteDisplay";
import { Truck, ArrowRight, Shield } from "lucide-react";

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
    <div className="absolute inset-x-0 bottom-6 z-30 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <RouteDisplay pickupLocation={pickupLocation} dropLocation={dropLocation} />
        {pickupLocation && dropLocation && (
          <div className="space-y-3">
            <div className="hidden sm:flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Insured Service</span>
              </div>
              <div className="w-px h-4 bg-gray-300 flex-shrink-0" />
              <div>Fast Response Time</div>
              <div className="w-px h-4 bg-gray-300 flex-shrink-0" />
              <div>Professional Drivers</div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-primary via-blue-600 to-primary hover:from-primary/90 
                       hover:to-primary/90 text-white shadow-lg hover:shadow-xl 
                       transition-all duration-300 py-4 sm:py-6 text-base sm:text-lg font-semibold
                       group relative overflow-hidden"
              onClick={onRequestTow}
              aria-label="Request tow truck service"
            >
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 
                           group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Request Tow Truck</span>
                <span className="sm:hidden">Request Tow</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};