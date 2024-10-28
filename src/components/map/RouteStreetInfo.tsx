import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, GripVertical } from "lucide-react";
import Draggable from "react-draggable";
import { useToast } from "@/components/ui/use-toast";

interface RouteStreetInfoProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

interface StreetInfo {
  pickup: string;
  drop: string;
}

export const RouteStreetInfo = ({ pickupLocation, dropLocation }: RouteStreetInfoProps) => {
  const [streetInfo, setStreetInfo] = useState<StreetInfo>({ pickup: "", drop: "" });
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStreetInfo = async () => {
      if (pickupLocation) {
        const pickupResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pickupLocation.lat}&lon=${pickupLocation.lng}`
        );
        const pickupData = await pickupResponse.json();
        setStreetInfo(prev => ({ ...prev, pickup: pickupData.display_name }));
      }
      
      if (dropLocation) {
        const dropResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${dropLocation.lat}&lon=${dropLocation.lng}`
        );
        const dropData = await dropResponse.json();
        setStreetInfo(prev => ({ ...prev, drop: dropData.display_name }));
      }
    };

    fetchStreetInfo();
  }, [pickupLocation, dropLocation]);

  const handleDragStart = () => {
    setIsDragging(true);
    toast({
      title: "Location info panel is now draggable",
      description: "You can move this panel anywhere on the screen",
      duration: 2000,
    });
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  if (!pickupLocation && !dropLocation) return null;

  return (
    <Draggable
      handle=".drag-handle"
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div className="absolute z-[1000] max-w-md">
        <Card className={`p-4 space-y-3 bg-white/95 backdrop-blur-sm ${isDragging ? 'shadow-2xl' : 'shadow-lg'} transition-shadow duration-200`}>
          <div className="flex items-center gap-2 border-b pb-2 mb-2">
            <div className="drag-handle cursor-grab active:cursor-grabbing p-1.5 hover:bg-primary/10 rounded-md">
              <GripVertical className="h-4 w-4 text-primary/70" />
            </div>
            <div className="font-semibold text-sm text-primary/90">Location Details</div>
          </div>
          
          {pickupLocation && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm">Pickup Location</div>
                <div className="text-sm text-gray-600 break-words">{streetInfo.pickup || "Loading..."}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Coordinates: {pickupLocation.lat.toFixed(6)}, {pickupLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}
          
          {dropLocation && (
            <div className="flex items-start gap-2">
              <Navigation className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm">Drop-off Location</div>
                <div className="text-sm text-gray-600 break-words">{streetInfo.drop || "Loading..."}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Coordinates: {dropLocation.lat.toFixed(6)}, {dropLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Draggable>
  );
};