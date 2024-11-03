import { useRef, useState, useEffect } from "react";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { showRouteNotification } from "@/utils/notificationUtils";
import { MapContainerComponent } from "./map/MapContainer";
import { MapControlPanel } from "./map/MapControlPanel";
import { AddressFields } from "./form/AddressFields";
import { useToast } from "@/hooks/use-toast";
import { detectTollsOnRoute } from "@/utils/tollCalculator";
import { useTowing } from "@/contexts/TowingContext";
import { updateLocationAddresses } from "@/utils/addressUtils";

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [dropAddress, setDropAddress] = useState<string>("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const { toast } = useToast();
  const { updateTollInfo } = useTowing();

  useEffect(() => {
    const updateAddresses = async () => {
      const addresses = await updateLocationAddresses(pickupLocation, dropLocation);
      setPickupAddress(addresses.pickup);
      setDropAddress(addresses.drop);

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

    updateAddresses();
  }, [pickupLocation, dropLocation, toast, updateTollInfo]);

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
              setPickupLocation(location);
              setSelectingPickup(false);
            } else if (selectingDrop) {
              setDropLocation(location);
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

      <div className="absolute inset-x-0 bottom-4 z-50 pointer-events-none">
        <div className="container mx-auto px-4">
          <AddressFields
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            onPickupSelect={(loc) => {
              setPickupLocation({ lat: loc.lat, lng: loc.lng });
              setPickupAddress(loc.address);
            }}
            onDropSelect={(loc) => {
              setDropLocation({ lat: loc.lat, lng: loc.lng });
              setDropAddress(loc.address);
            }}
            className="pointer-events-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TowMap;