import { memo, useEffect, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { MapLocationHandler } from "./MapLocationHandler";
import { enterpriseIcon, pickupIcon, dropIcon } from "@/utils/mapUtils";
import { COMPANY_LOCATION } from "@/services/routeService";
import { Marker, Popup } from "react-leaflet";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { useToast } from "@/hooks/use-toast";

interface Location {
  lat: number;
  lng: number;
}

interface MapUpdaterProps {
  pickupLocation: Location | null;
  dropLocation: Location | null;
}

const MapUpdater = memo(({ pickupLocation, dropLocation }: MapUpdaterProps) => {
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
      
      if (now - lastToastTime.current > 3000) {
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
  }, [map, pickupLocation, dropLocation, toast]);

  return null;
});

MapUpdater.displayName = 'MapUpdater';

interface MapContainerComponentProps {
  pickupLocation: Location | null;
  dropLocation: Location | null;
  selectingPickup: boolean;
  selectingDrop: boolean;
  onLocationSelect: (location: Location) => void;
  setPickupLocation: (location: Location | null) => void;
  setDropLocation: (location: Location | null) => void;
  onRouteCalculated: (distance: number) => void;
  isLoading?: boolean;
}

export const MapContainerComponent = memo(({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated,
  isLoading = false
}: MapContainerComponentProps) => {
  const { toast } = useToast();
  const lastToastTime = useRef(0);
  
  const handleLocationSelect = useCallback(async (location: Location) => {
    try {
      const now = Date.now();
      if (now - lastToastTime.current > 3000) {
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
      if (now - lastToastTime.current > 3000) {
        toast({
          title: "Error",
          description: "No se pudo obtener la dirección",
          variant: "destructive",
        });
        lastToastTime.current = now;
      }
    }
  }, [onLocationSelect, selectingPickup, toast]);

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
          onDragEnd={(latlng) => {
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
          onDragEnd={(latlng) => {
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
});

MapContainerComponent.displayName = 'MapContainerComponent';