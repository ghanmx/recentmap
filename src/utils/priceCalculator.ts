interface Location {
  lat: number;
  lng: number;
}

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };

const TOLL_LOCATIONS = [
  { name: "Autopista Monterrey Cadereyta", lat: 25.6603, lng: -100.2142, cost: 385 },
  { name: "Periférico de Monterrey", lat: 25.6767, lng: -100.3165, cost: 385 },
  { name: "Cadereyta – Reynosa (40D)", lat: 26.0292, lng: -99.8537, cost: 385 },
  { name: "Monterrey – Saltillo (40D)", lat: 25.4506, lng: -100.9447, cost: 385 },
  { name: "Puerto México – Ent. La Carbonera (57D)", lat: 23.1234, lng: -101.6543, cost: 385 },
  { name: "Monterrey – Nuevo Laredo (85D)", lat: 27.5067, lng: -99.5075, cost: 385 },
  { name: "Puente Cadereyta", lat: 25.5333, lng: -99.9747, cost: 385 },
  { name: "Puente Solidaridad", lat: 25.8434, lng: -100.2453, cost: 385 },
];

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

const isNearToll = (point: Location, toll: typeof TOLL_LOCATIONS[0]): boolean => {
  const distance = calculateDistance(point, toll);
  return distance < 0.5; // 500 meters in kilometers
};

const calculateTollFees = (route: Location[], isRoundTrip: boolean = true): number => {
  const usedTolls = new Set<string>();
  let totalFees = 0;

  route.forEach((point) => {
    TOLL_LOCATIONS.forEach((toll) => {
      if (isNearToll(point, toll) && !usedTolls.has(toll.name)) {
        usedTolls.add(toll.name);
        totalFees += toll.cost * (isRoundTrip ? 2 : 1);
      }
    });
  });

  return totalFees;
};

export interface RouteDetails {
  totalPrice: number;
  totalDistance: number;
  segments: {
    companyToPickup: number;
    pickupToDrop: number;
    dropToCompany: number;
  };
  towTruckType: string;
  tollFees: number;
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
  requiresManeuver = false,
  isRoundTrip = true
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

    // Calculate toll fees for the complete route
    const routePoints = [
      COMPANY_LOCATION,
      pickupLocation,
      dropLocation,
      COMPANY_LOCATION
    ];
    
    const tollFees = calculateTollFees(routePoints, isRoundTrip);
    
    // Get tow truck type and calculate total price
    const towTruckType = getTowTruckType(vehicleModel);
    const basePrice = calculateTotalCost(totalDistance, towTruckType, requiresManeuver);
    const totalPrice = Number((basePrice + tollFees).toFixed(2));

    return {
      totalPrice,
      totalDistance,
      segments,
      towTruckType,
      tollFees,
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

// Import these from your existing files to maintain functionality
import { getRouteDetails } from '../services/routeService';
import { calculateTotalCost, getTowTruckType } from './towTruckPricing';