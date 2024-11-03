import { useRef, useState, useEffect } from "react";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { showRouteNotification } from "@/utils/notificationUtils";
import { MapContainerComponent } from "./map/MapContainer";
import { MapControlPanel } from "./map/MapControlPanel";
import { useToast } from "@/hooks/use-toast";
import { detectTollsOnRoute } from "@/utils/tollCalculator";
import { useTowing } from "@/contexts/TowingContext";
import { getAddressFromCoordinates } from "@/services/geocodingService";

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const { toast } = useToast();
  const { updateTollInfo } = useTowing();

  useEffect(() => {
    const updateTolls = async () => {
      if (pickupLocation && dropLocation) {
        const tollInfo = await detectTollsOnRoute(pickupLocation, dropLocation);
        updateTollInfo(tollInfo.tolls, tollInfo.totalTollCost);
        
        if (tollInfo.tolls.length > 0) {
          toast({
            title: "Peajes Detectados",
            description: `Se detectaron ${tollInfo.tolls.length} peajes en la ruta con un costo total de $${tollInfo.totalTollCost}`,
          });
        }
      }
    };

    updateTolls();
  }, [pickupLocation, dropLocation, toast, updateTollInfo]);

  const handleLocationSelect = async (location: { lat: number; lng: number }, type: 'pickup' | 'drop') => {
    try {
      const address = await getAddressFromCoordinates(location.lat, location.lng);
      if (type === 'pickup') {
        setPickupLocation(location);
        setPickupAddress(address);
        toast({
          title: "Ubicación de Recogida",
          description: address,
        });
      } else {
        setDropLocation(location);
        setDropAddress(address);
        toast({
          title: "Ubicación de Entrega",
          description: address,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo obtener la dirección",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <MapContainerComponent
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onLocationSelect={(location) => {
            if (selectingPickup) {
              handleLocationSelect(location, 'pickup');
              setSelectingPickup(false);
            } else if (selectingDrop) {
              handleLocationSelect(location, 'drop');
              setSelectingDrop(false);
            }
          }}
          setPickupLocation={setPickupLocation}
          setDropLocation={setDropLocation}
          onRouteCalculated={(distance) => showRouteNotification(distance)}
        />
      </div>
      
      <div className="absolute inset-x-0 top-24 z-50 pointer-events-none">
        <div className="container mx-auto px-4">
          <MapControlPanel 
            selectingPickup={selectingPickup}
            selectingDrop={selectingDrop}
            setSelectingPickup={setSelectingPickup}
            setSelectingDrop={setSelectingDrop}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default TowMap;