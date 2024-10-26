interface Location {
  lat: number;
  lng: number;
}

export const calculateRoadDistance = async (point1: Location, point2: Location): Promise<number> => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${point1.lng},${point1.lat};${point2.lng},${point2.lat}?overview=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }

    // OSRM returns distance in meters, convert to kilometers
    return data.routes[0].distance / 1000;
  } catch (error) {
    console.error('Error calculating road distance:', error);
    // Fallback to straight-line distance if API fails
    return calculateStraightLineDistance(point1, point2);
  }
};

// Fallback straight-line distance calculation
const calculateStraightLineDistance = (point1: Location, point2: Location): number => {
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