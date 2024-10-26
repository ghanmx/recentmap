import { calculateTotalCost, getTowTruckType } from './towTruckPricing';
import { getRouteDetails } from '../services/osrmService';

interface Location {
  lat: number;
  lng: number;
}

export const calculateTowingPrice = async (
  companyLocation: Location,
  pickupLocation: Location,
  dropLocation: Location,
  vehicleModel: string,
  requiresManeuver = false
) => {
  try {
    // Get route from company to pickup
    const companyToPickup = await getRouteDetails(companyLocation, pickupLocation);
    
    // Get route from pickup to drop-off
    const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation);
    
    // Calculate total distance
    const totalDistance = companyToPickup.distance + pickupToDrop.distance;
    
    // Get tow truck type based on vehicle
    const towTruckType = getTowTruckType(vehicleModel);
    
    // Calculate total price
    const totalPrice = calculateTotalCost(totalDistance, towTruckType, requiresManeuver);

    return {
      totalPrice,
      totalDistance,
      towTruckType,
      routeGeometry: {
        companyToPickup: companyToPickup.geometry,
        pickupToDrop: pickupToDrop.geometry
      }
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};