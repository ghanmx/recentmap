import { useRef, useState } from "react";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { showRouteNotification } from "@/utils/notificationUtils";
import { MapLayout } from "./map/MapLayout";
import { MapHeader } from "./map/MapHeader";
import { MapBottomControls } from "./map/MapBottomControls";
import { MapContainerComponent } from "./map/MapContainer";
import { MapControlPanel } from "./map/MapControlPanel";
import { LocationPanels } from "./map/LocationPanels";
import { useToast } from "@/hooks/use-toast";
import { getAddressFromCoordinates } from "@/services/geocodingService";

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [dropAddress, setDropAddress] = useState<string>("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const updateAddresses = async () => {
      if (pickupLocation) {
        const address = await getAddressFromCoordinates(pickupLocation.lat, pickupLocation.lng);
        setPickupAddress(address);
      }
      if (dropLocation) {
        const address = await getAddressFromCoordinates(dropLocation.lat, dropLocation.lng);
        setDropAddress(address);
      }
    };

    updateAddresses();
  }, [pickupLocation, dropLocation]);

  const handleLocationSearch = async (location: { lat: number; lng: number; address: string }, type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      setPickupLocation({ lat: location.lat, lng: location.lng });
      setPickupAddress(location.address);
    } else {
      setDropLocation({ lat: location.lat, lng: location.lng });
      setDropAddress(location.address);
    }
  };

  return (
    <MapLayout>
      <MapHeader />
      
      <div className="relative h-[calc(100vh-4rem)]">
        <MapControlPanel
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          setSelectingPickup={setSelectingPickup}
          setSelectingDrop={setSelectingDrop}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
        />

        <div className="absolute inset-0 z-10">
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

        <LocationPanels
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
        />
      </div>
    </MapLayout>
  );
};

export default TowMap;