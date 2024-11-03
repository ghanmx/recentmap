import { TOLL_LOCATIONS } from '@/data/tollData';

interface Location {
  lat: number;
  lng: number;
}

const TOLL_DETECTION_RADIUS = 0.5; // 500 meters in kilometers

const calculateDistance = (point1: Location, point2: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const detectTollsOnRoute = (pickupLocation: Location, dropLocation: Location) => {
  const detectedTolls = TOLL_LOCATIONS.filter(toll => {
    const distanceFromPickup = calculateDistance(pickupLocation, toll);
    const distanceFromDrop = calculateDistance(dropLocation, toll);
    const isOnRoute = distanceFromPickup <= TOLL_DETECTION_RADIUS || distanceFromDrop <= TOLL_DETECTION_RADIUS;
    return isOnRoute;
  });

  return {
    tolls: detectedTolls,
    totalTollCost: detectedTolls.reduce((sum, toll) => sum + toll.cost, 0)
  };
};