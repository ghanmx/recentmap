import { MapContainer, TileLayer } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { MapControls } from "./MapControls";
import { BorderControls } from "./BorderControls";
import { MapLocationHandler } from "./MapLocationHandler";
import { enterpriseIcon, pickupIcon, dropIcon } from "@/utils/mapUtils";
import { COMPANY_LOCATION } from "@/services/routeService";
import { Marker, Popup, useMap } from "react-leaflet";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { useEffect, useRef } from "react";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { useToast } from "@/components/ui/use-toast";

const NOTIFICATION_COOLDOWN = 3000; // 3 seconds cooldown between notifications

const MapUpdater = ({ 
  pickupLocation, 
  dropLocation 
}: { 
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}) => {
  const map = useMap();
  const { toast } = useToast();
  const lastToastTime = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (pickupLocation && dropLocation) {
      const bounds = new LatLngBounds(
        [pickupLocation.lat, pickupLocation.lng],
        [dropLocation.lat, dropLocation.lng]
      );
      map.fitBounds(bounds, { padding: [50, 50] });
      
      if (now - lastToastTime.current > NOTIFICATION_COOLDOWN) {
        toast({
          title: "Ruta actualizada",
          description: "El mapa se ha ajustado para mostrar la ruta completa",
        });
        lastToastTime.current = now;
      }
    } else if (pickupLocation) {
      map.setView([pickupLocation.lat, pickupLocation.lng], 15);
    } else if (dropLocation) {
      map.setView([dropLocation.lat, dropLocation.lng], 15);
    }
  }, [map, pickupLocation, dropLocation]);

  return null;
};

interface MapContainerComponentProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  selectingPickup: boolean;
  selectingDrop: boolean;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  setPickupLocation: (location: { lat: number; lng: number } | null) => void;
  setDropLocation: (location: { lat: number; lng: number } | null) => void;
  onRouteCalculated: (distance: number) => void;
}

export const MapContainerComponent = ({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated
}: MapContainerComponentProps) => {
  const { toast } = useToast();
  const lastToastTime = useRef(0);
  
  const handleLocationSelect = async (location: { lat: number; lng: number }) => {
    try {
      const now = Date.now();
      if (now - lastToastTime.current > NOTIFICATION_COOLDOWN) {
        const address = await getAddressFromCoordinates(location.lat, location.lng);
        onLocationSelect(location);
        toast({
          title: selectingPickup ? "Punto de recogida seleccionado" : "Punto de entrega seleccionado",
          description: address,
        });
        lastToastTime.current = now;
      } else {
        onLocationSelect(location);
      }
    } catch (error) {
      const now = Date.now();
      if (now - lastToastTime.current > NOTIFICATION_COOLDOWN) {
        toast({
          title: "Error",
          description: "No se pudo obtener la dirección",
          variant: "destructive",
        });
        lastToastTime.current = now;
      }
    }
  };

  const defaultPosition: LatLngTuple = [25.6866, -100.3161];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      className="w-full h-full rounded-lg shadow-lg"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="brightness-95"
      />
      
      <MapLocationHandler
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        handleLocationSelect={handleLocationSelect}
      />

      <MapUpdater pickupLocation={pickupLocation} dropLocation={dropLocation} />

      <Marker 
        position={[COMPANY_LOCATION.lat, COMPANY_LOCATION.lng]} 
        icon={enterpriseIcon}
      >
        <Popup className="rounded-lg shadow-lg">
          <div className="font-semibold">Empresa de Grúas</div>
          <div className="text-sm text-gray-600">Ubicación Principal</div>
        </Popup>
      </Marker>

      {pickupLocation && (
        <DraggableMarker
          position={[pickupLocation.lat, pickupLocation.lng]}
          onDragEnd={async (latlng) => {
            const location = { lat: latlng.lat, lng: latlng.lng };
            setPickupLocation(location);
            handleLocationSelect(location);
          }}
          icon={pickupIcon}
          label="Punto de Recogida"
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={[dropLocation.lat, dropLocation.lng]}
          onDragEnd={async (latlng) => {
            const location = { lat: latlng.lat, lng: latlng.lng };
            setDropLocation(location);
            handleLocationSelect(location);
          }}
          icon={dropIcon}
          label="Punto de Entrega"
        />
      )}

      {pickupLocation && dropLocation && (
        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={onRouteCalculated}
        />
      )}
    </MapContainer>
  );
};