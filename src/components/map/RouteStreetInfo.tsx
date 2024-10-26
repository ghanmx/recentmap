import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

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

  if (!pickupLocation && !dropLocation) return null;

  return (
    <Card className="p-4 space-y-3 bg-white/90 backdrop-blur-sm shadow-lg">
      {pickupLocation && (
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
          <div>
            <div className="font-semibold text-sm">Pickup Location</div>
            <div className="text-sm text-gray-600 break-words">{streetInfo.pickup || "Loading..."}</div>
          </div>
        </div>
      )}
      {dropLocation && (
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" />
          <div>
            <div className="font-semibold text-sm">Drop-off Location</div>
            <div className="text-sm text-gray-600 break-words">{streetInfo.drop || "Loading..."}</div>
          </div>
        </div>
      )}
    </Card>
  );
};