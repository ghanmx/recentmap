import { getAddressFromCoords } from '@/services/geocodingService'
import { Location } from '@/types/location'

// Dummy function to simulate location fetching
export const fetchLocation = (lat: number, lng: number): Promise<Location> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ lat, lng, address: `(${lat}, ${lng})` });
    }, 1000);
  });
};

export const getLocationAndAddress = async (lat: number, lng: number) => {
  const address = await getAddressFromCoords(lat, lng);
  return { lat, lng, address };
};

export const getCoordinatesFromAddress = async (address: string): Promise<Location | null> => {
  // Dummy implementation
  const simulatedLocation = await fetchLocation(25.7617, -80.1918);
  return { ...simulatedLocation, address };
};
