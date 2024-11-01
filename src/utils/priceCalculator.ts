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
    // Get route segments using vehicle profile
    const companyToPickup = await getRouteDetails(COMPANY_LOCATION, pickupLocation);
    const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation);
    const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION);
    
    // Calculate segments with precise rounding
    const segments = {
      companyToPickup: Number(companyToPickup.distance.toFixed(2)),
      pickupToDrop: Number(pickupToDrop.distance.toFixed(2)),
      dropToCompany: Number(dropToCompany.distance.toFixed(2))
    };
    
    // Calculate total distance with consistent rounding
    const totalDistance = Number((
      segments.companyToPickup +
      segments.pickupToDrop +
      segments.dropToCompany
    ).toFixed(2));
    
    // Get tow truck type and calculate total price
    const towTruckType = getTowTruckType(vehicleModel);
    const totalPrice = Number(calculateTotalCost(totalDistance, towTruckType, requiresManeuver).toFixed(2));

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