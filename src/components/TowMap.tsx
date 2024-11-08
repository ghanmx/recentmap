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

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const mapRef = useRef<Map | null>(null);
  const { toast } = useToast();
  const { updateTollInfo, updateLocationInfo } = useTowing();

  const retryWithDelay = async (fn: () => Promise<any>, attempt: number = 0): Promise<any> => {
    try {
      return await fn();
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        toast({
          title: "Reintentando...",
          description: `Intento ${attempt + 1} de ${MAX_RETRIES}`,
          duration: RETRY_DELAY,
        });
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return retryWithDelay(fn, attempt + 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    const updateTolls = async () => {
      if (pickupLocation && dropLocation) {
        try {
          setIsLoading(true);
          const tollInfo = await retryWithDelay(async () => {
            return await detectTollsOnRoute(pickupLocation, dropLocation);
          });
          
          updateTollInfo(tollInfo.tolls, tollInfo.totalTollCost);
          
          if (tollInfo.tolls.length > 0) {
            toast({
              title: "Peajes Detectados",
              description: `Se detectaron ${tollInfo.tolls.length} peajes en la ruta con un costo total de $${tollInfo.totalTollCost.toFixed(2)}`,
              duration: 5000,
            });
          } else {
            toast({
              title: "Sin Peajes",
              description: "No se detectaron peajes en la ruta seleccionada",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error('Error detecting tolls:', error);
          toast({
            title: "Error al Detectar Peajes",
            description: "No se pudieron detectar los peajes en la ruta. Por favor, intente nuevamente.",
            variant: "destructive",
            duration: 5000,
          });
        } finally {
          setIsLoading(false);
          setRetryCount(0);
        }
      }
    };

    updateTolls();
  }, [pickupLocation, dropLocation, toast, updateTollInfo]);

  const handleLocationSelect = async (location: { lat: number; lng: number }, type: 'pickup' | 'drop') => {
    try {
      setIsLoading(true);
      const address = await retryWithDelay(async () => {
        return await getAddressFromCoordinates(location.lat, location.lng);
      });
      
      if (type === 'pickup') {
        setPickupLocation(location);
        setPickupAddress(address);
        setSelectingPickup(false);
        updateLocationInfo({ pickup: { ...location, address } });
        toast({
          title: "Ubicación de Recogida",
          description: address,
          duration: 3000,
        });
      } else {
        setDropLocation(location);
        setDropAddress(address);
        setSelectingDrop(false);
        updateLocationInfo({ drop: { ...location, address } });
        toast({
          title: "Ubicación de Entrega",
          description: address,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error getting address:', error);
      toast({
        title: "Error de Ubicación",
        description: "No se pudo obtener la dirección. Por favor, intente seleccionar otro punto.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
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
            } else if (selectingDrop) {
              handleLocationSelect(location, 'drop');
            }
          }}
          setPickupLocation={setPickupLocation}
          setDropLocation={setDropLocation}
          onRouteCalculated={(distance) => showRouteNotification(distance)}
          isLoading={isLoading}
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
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Use a standard paragraph with screen reader class */}
      <p className="sr-only">
        Mapa interactivo para seleccionar ubicaciones de recogida y entrega del servicio de grúa
      </p>
    </div>
  );
};

export default TowMap;