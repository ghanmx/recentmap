export const calculateTowingPrice = (
  pickupLocation: { lat: number; lng: number } | null,
  dropLocation: { lat: number; lng: number } | null,
  serviceType: 'standard' | 'flatbed' | 'emergency'
): number => {
  if (!pickupLocation || !dropLocation) return 0;

  // Calculate distance using Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = (dropLocation.lat - pickupLocation.lat) * Math.PI / 180;
  const dLon = (dropLocation.lng - pickupLocation.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pickupLocation.lat * Math.PI / 180) * Math.cos(dropLocation.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  // Base price per km
  const basePrice = {
    standard: 2.5,
    flatbed: 3.5,
    emergency: 5.0
  }[serviceType];

  // Calculate total price
  const totalPrice = distance * basePrice;
  
  // Add service type premium
  const servicePremium = {
    standard: 1,
    flatbed: 1.2,
    emergency: 1.5
  }[serviceType];

  return Math.round(totalPrice * servicePremium);
};