import { calculateTotalCost, getTowTruckType } from './towTruckPricing';
import { getRouteDetails } from '../services/routeService';

interface Location {
  lat: number;
  lng: number;
}

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };

export interface RouteDetails {
  totalPrice: number;
  totalDistance: number;
  segments: {
    companyToPickup: number;
    pickupToDrop: number;
    dropToCompany: number;
  };
  towTruckType: string;
  routeGeometry: {
    companyToPickup: string;
    pickupToDrop: string;
    dropToCompany: string;
  };
}

export const calculateTowingPrice = async (
  pickupLocation: Location,
  dropLocation: Location,
  vehicleModel: string,
  requiresManeuver = false
): Promise<RouteDetails> => {
  try {
    // Get route from company to pickup
    const companyToPickup = await getRouteDetails(COMPANY_LOCATION, pickupLocation);
    
    // Get route from pickup to drop-off
    const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation);
    
    // Get route from drop-off back to company
    const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION);
    
    // Calculate total distance including return trip
    const segments = {
      companyToPickup: companyToPickup.distance,
      pickupToDrop: pickupToDrop.distance,
      dropToCompany: dropToCompany.distance
    };
    
    const totalDistance = segments.companyToPickup + segments.pickupToDrop + segments.dropToCompany;
    
    // Get tow truck type based on vehicle
    const towTruckType = getTowTruckType(vehicleModel);
    
    // Calculate total price including all segments
    const totalPrice = calculateTotalCost(totalDistance, towTruckType, requiresManeuver);

    return {
      totalPrice,
      totalDistance,
      segments,
      towTruckType,
      routeGeometry: {
        companyToPickup: companyToPickup.geometry,
        pickupToDrop: pickupToDrop.geometry,
        dropToCompany: dropToCompany.geometry
      }
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};