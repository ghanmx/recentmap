import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { decode } from "@mapbox/polyline";
import { showRouteNotification } from "@/utils/notificationUtils";
import { useTowing } from "@/contexts/TowingContext";
import { getRouteDetails } from "@/services/routeService";
import { COMPANY_LOCATION } from "@/utils/priceCalculator";
import { useToast } from "@/hooks/use-toast";
import { detectTollsOnRoute } from "@/utils/tollCalculator";

interface RoutePolylineProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  onRouteCalculated?: (distance: number) => void;
}

interface RouteSegment {
  positions: [number, number][];
  color: string;
  opacity: number;
  dashArray?: string;
}

/**
 * Decodes and formats route geometry from API response
 */
const decodeRouteGeometry = (geometry: string) => {
  return decode(geometry).map(([lat, lng]) => [lat, lng]);
};

/**
 * Creates route segments with appropriate styling
 */
const createRouteSegments = (
  companyToPickup: [number, number][],
  pickupToDrop: [number, number][],
  dropToCompany: [number, number][]
): RouteSegment[] => {
  return [
    { positions: companyToPickup, color: "blue", opacity: 0.7, dashArray: "10, 10" },
    { positions: pickupToDrop, color: "green", opacity: 0.9 },
    { positions: dropToCompany, color: "red", opacity: 0.7, dashArray: "10, 10" }
  ];
};

export const RoutePolyline = ({ 
  pickupLocation, 
  dropLocation, 
  onRouteCalculated 
}: RoutePolylineProps) => {
  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);
  const { updateTowingInfo, updateTollInfo } = useTowing();
  const { toast } = useToast();

  useEffect(() => {
    const calculateRoutes = async () => {
      if (!pickupLocation || !dropLocation) return;

      try {
        // Calculate routes for each segment
        const companyToPickup = await getRouteDetails(COMPANY_LOCATION, pickupLocation);
        const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation);
        const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION);

        // Process route geometries
        const segments = createRouteSegments(
          decodeRouteGeometry(companyToPickup.geometry),
          decodeRouteGeometry(pickupToDrop.geometry),
          decodeRouteGeometry(dropToCompany.geometry)
        );

        setRouteSegments(segments);

        // Calculate total distance
        const totalDistance = 
          companyToPickup.distance + 
          pickupToDrop.distance + 
          dropToCompany.distance;

        // Detect and process tolls
        const tollInfo = await detectTollsOnRoute(pickupLocation, dropLocation);
        
        console.log('Route calculation complete:', {
          totalDistance,
          tollInfo,
          routes: {
            companyToPickup: companyToPickup.distance,
            pickupToDrop: pickupToDrop.distance,
            dropToCompany: dropToCompany.distance
          }
        });

        // Update global context
        updateTowingInfo(totalDistance);
        updateTollInfo(tollInfo.tolls, tollInfo.totalTollCost);
        onRouteCalculated?.(totalDistance);

        // Show toll notification if applicable
        if (tollInfo.tolls.length > 0) {
          toast({
            title: "Peajes detectados en la ruta",
            description: `Se han detectado ${tollInfo.tolls.length} peajes con un costo total de ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(tollInfo.totalTollCost)}`,
          });
        }

        showRouteNotification(totalDistance);
      } catch (error) {
        console.error('Error calculating routes:', error);
        toast({
          title: "Error al calcular la ruta",
          description: error instanceof Error ? error.message : "Por favor, intente nuevamente en unos segundos",
          variant: "destructive",
        });
      }
    };

    calculateRoutes();
  }, [pickupLocation, dropLocation, onRouteCalculated, updateTowingInfo, updateTollInfo, toast]);

  return (
    <>
      {routeSegments.map((segment, index) => (
        <Polyline 
          key={index}
          positions={segment.positions}
          color={segment.color}
          weight={3}
          dashArray={segment.dashArray}
          opacity={segment.opacity}
        />
      ))}
    </>
  );
};