import { TOLL_LOCATIONS } from '@/data/tollData';
import { calculateDistance } from './distanceUtils';
import { getRouteDetails } from '@/services/routeService';

interface Location {
  lat: number;
  lng: number;
}

const TOLL_DETECTION_RADIUS = 1.0; // Increased to 1km for better detection
const TOLL_BUFFER_DISTANCE = 0.2; // 200m buffer for route proximity

export const detectTollsOnRoute = async (pickupLocation: Location, dropLocation: Location) => {
  try {
    // Get the actual route
    const routeDetails = await getRouteDetails(pickupLocation, dropLocation);
    const routePoints = decodePolyline(routeDetails.geometry);
    
    const detectedTolls = TOLL_LOCATIONS.filter(toll => {
      // Check if toll is near pickup or drop location
      const nearPickup = calculateDistance(pickupLocation, toll) <= TOLL_DETECTION_RADIUS;
      const nearDrop = calculateDistance(dropLocation, toll) <= TOLL_DETECTION_RADIUS;
      
      // Check if toll is along the route
      const nearRoute = routePoints.some(point => 
        calculateDistance({ lat: point[0], lng: point[1] }, toll) <= TOLL_BUFFER_DISTANCE
      );

      return nearPickup || nearDrop || nearRoute;
    });

    const totalTollCost = detectedTolls.reduce((sum, toll) => sum + toll.cost, 0);

    return {
      tolls: detectedTolls,
      totalTollCost,
      routeDetails
    };
  } catch (error) {
    console.warn('Error detecting tolls, falling back to simple detection:', error);
    // Fallback to simple point-to-point detection
    const detectedTolls = TOLL_LOCATIONS.filter(toll => {
      const distanceFromPickup = calculateDistance(pickupLocation, toll);
      const distanceFromDrop = calculateDistance(dropLocation, toll);
      return distanceFromPickup <= TOLL_DETECTION_RADIUS || distanceFromDrop <= TOLL_DETECTION_RADIUS;
    });

    return {
      tolls: detectedTolls,
      totalTollCost: detectedTolls.reduce((sum, toll) => sum + toll.cost, 0),
      routeDetails: null
    };
  }
};

// Helper function to decode polyline
function decodePolyline(str: string, precision = 5) {
  let index = 0,
      lat = 0,
      lng = 0,
      coordinates = [],
      shift = 0,
      result = 0,
      byte = null,
      latitude_change,
      longitude_change,
      factor = Math.pow(10, precision);

  while (index < str.length) {
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    shift = result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
}