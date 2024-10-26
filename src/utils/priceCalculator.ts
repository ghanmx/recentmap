const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number => {
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

export const calculateTowingPrice = (
  companyLocation: { lat: number; lng: number },
  pickupLocation: { lat: number; lng: number } | null,
  dropLocation: { lat: number; lng: number } | null,
  serviceType: 'standard' | 'flatbed' | 'emergency'
): { totalPrice: number; totalDistance: number } => {
  if (!pickupLocation || !dropLocation) return { totalPrice: 0, totalDistance: 0 };

  // Calculate distances for each leg of the journey
  const companyToPickup = calculateDistance(companyLocation, pickupLocation);
  const pickupToDrop = calculateDistance(pickupLocation, dropLocation);
  const dropToCompany = calculateDistance(dropLocation, companyLocation);

  // Total distance for the complete journey
  const totalDistance = companyToPickup + pickupToDrop + dropToCompany;

  // Base price per km
  const basePrice = {
    standard: 2.5,
    flatbed: 3.5,
    emergency: 5.0
  }[serviceType];

  // Service type premium
  const servicePremium = {
    standard: 1,
    flatbed: 1.2,
    emergency: 1.5
  }[serviceType];

  // Calculate total price including all journey legs and service premium
  const totalPrice = Math.round(totalDistance * basePrice * servicePremium);

  return { totalPrice, totalDistance };
};