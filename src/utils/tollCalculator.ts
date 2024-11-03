import { TOLL_LOCATIONS } from '@/data/tollData';
import { calculateDistance } from './distanceUtils';

interface Location {
  lat: number;
  lng: number;
}

const TOLL_DETECTION_RADIUS = 0.5; // 500 meters in kilometers

export const detectTollsOnRoute = (pickupLocation: Location, dropLocation: Location) => {
  const detectedTolls = TOLL_LOCATIONS.filter(toll => {
    const distanceFromPickup = calculateDistance(pickupLocation, toll);
    const distanceFromDrop = calculateDistance(dropLocation, toll);
    return distanceFromPickup <= TOLL_DETECTION_RADIUS || distanceFromDrop <= TOLL_DETECTION_RADIUS;
  });

  return {
    tolls: detectedTolls,
    totalTollCost: detectedTolls.reduce((sum, toll) => sum + toll.cost, 0)
  };
};