import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { getRouteDetails } from "@/services/routeService";
import { decode } from "@mapbox/polyline";

interface RoutePolylineProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  onRouteCalculated?: (distance: number) => void;
}

export const RoutePolyline = ({ pickupLocation, dropLocation, onRouteCalculated }: RoutePolylineProps) => {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const route = await getRouteDetails(pickupLocation, dropLocation);
          const decodedCoordinates = decode(route.geometry).map(([lat, lng]) => [lat, lng] as [number, number]);
          setRouteCoordinates(decodedCoordinates);
          onRouteCalculated?.(route.distance);
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    };

    fetchRoute();
  }, [pickupLocation, dropLocation, onRouteCalculated]);

  if (!routeCoordinates.length) return null;

  return <Polyline positions={routeCoordinates} color="blue" weight={3} />;
};