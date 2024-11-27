import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { MapLocationHandler } from "./MapLocationHandler";
import { enterpriseIcon, pickupIcon, dropIcon } from "@/utils/mapUtils";
import { COMPANY_LOCATION } from "@/services/routeService";
import { Marker, Popup } from "react-leaflet";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { useEffect, useRef, MutableRefObject } from "react";
import { LatLngTuple, LatLngBounds, Map } from "leaflet";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Location {
  lat: number;
  lng: number;
}

const MapUpdater = ({ pickupLocation, dropLocation }: { 
  pickupLocation: Location | null;
  dropLocation: Location | null;
}) => {
  const map = useMap();
  const { toast } = useToast();
  const lastToastTime = useRef(0);

  useEffect(() => {
    if (!map) return;

    const now = Date.now();
    const locations = [pickupLocation, dropLocation].filter(Boolean) as Location[];
    
    if (locations.length === 0) return;

    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 15);
    } else {
      const bounds = new LatLngBounds(
        locations.map(loc => [loc.lat, loc.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    if (now - lastToastTime.current > 3000) {
      toast({
        title: "Mapa actualizado",
        description: locations.length > 1 ? "Ruta completa visible" : "Vista centrada en ubicación",
      });
      lastToastTime.current = now;
    }
  }, [map, pickupLocation, dropLocation, toast]);

  return null;
};

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
  mapRef?: MutableRefObject<Map | null>;
}

export const MapContainerComponent = ({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated,
  isLoading = false,
  mapRef
}: MapContainerComponentProps) => {
  const { toast } = useToast();
  const lastToastTime = useRef(0);

  const handleLocationSelect = async (location: Location) => {
    try {
      const now = Date.now();
      const address = await getAddressFromCoordinates(location.lat, location.lng);
      
      onLocationSelect(location);
      mapRef?.current?.setView([location.lat, location.lng], 16);

      if (now - lastToastTime.current > 3000) {
        toast({
          title: selectingPickup ? "Punto de recogida seleccionado" : "Punto de entrega seleccionado",
          description: address,
        });
        lastToastTime.current = now;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo obtener la dirección",
        variant: "destructive",
      });
    }
  };

  const defaultPosition: LatLngTuple = [25.6866, -100.3161];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full rounded-lg overflow-hidden shadow-lg"
    >
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
        ref={mapRef}
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
    </motion.div>
  );
};