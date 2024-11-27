import { useMapEvents } from "react-leaflet";
import { useToast } from "@/hooks/use-toast";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectingPickup: boolean;
  selectingDrop: boolean;
}

export const LocationMarker = ({ 
  onLocationSelect, 
  selectingPickup, 
  selectingDrop 
}: LocationMarkerProps) => {
  const { toast } = useToast();

  useMapEvents({
    click(e) {
      if (selectingPickup || selectingDrop) {
        onLocationSelect(e.latlng);
        toast({
          title: `${selectingPickup ? 'Pickup' : 'Drop-off'} Location Set`,
          description: "Location has been successfully set on the map",
          duration: 3000,
        });
      }
    },
  });

  return null;
};