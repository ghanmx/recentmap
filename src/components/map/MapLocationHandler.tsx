import { useMapEvents } from "react-leaflet";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { useToast } from "@/hooks/use-toast";

interface MapLocationHandlerProps {
  selectingPickup: boolean;
  selectingDrop: boolean;
  handleLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export const MapLocationHandler = ({
  selectingPickup,
  selectingDrop,
  handleLocationSelect,
}: MapLocationHandlerProps) => {
  const { toast } = useToast();

  const handleClick = async (e: L.LeafletMouseEvent) => {
    if (selectingPickup || selectingDrop) {
      try {
        const address = await getAddressFromCoordinates(e.latlng.lat, e.latlng.lng);
        handleLocationSelect({ 
          lat: e.latlng.lat, 
          lng: e.latlng.lng,
          address: address 
        });
        
        toast({
          title: selectingPickup ? "Punto de recogida seleccionado" : "Punto de entrega seleccionado",
          description: address,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo obtener la dirección del punto seleccionado",
          variant: "destructive"
        });
      }
    }
  };

  useMapEvents({
    click: handleClick,
  });

  return null;
};