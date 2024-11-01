interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

// Fallback calculation using Haversine formula with road factor
const calculateStraightLineDistance = (start: Location, end: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const straightLineDistance = R * c;
  
  // Apply a road factor to approximate actual road distance
  const ROAD_FACTOR = 1.3; // Typical road distance is ~30% longer than straight line
  return Number((straightLineDistance * ROAD_FACTOR).toFixed(2));
};

// Generate a more realistic route geometry for fallback
const generateFallbackGeometry = (start: Location, end: Location): string => {
  // Create intermediate points to simulate a more realistic route
  const midLat = (start.lat + end.lat) / 2;
  const midLng = (start.lng + end.lng) / 2;
  
  // Add slight offset to avoid straight lines
  const offset = 0.01; // Approximately 1km at equator
  const points = [
    [start.lat, start.lng],
    [midLat + offset, midLng - offset],
    [midLat - offset, midLng + offset],
    [end.lat, end.lng]
  ];
  
  return btoa(JSON.stringify(points));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  const AVG_SPEED = 50; // km/h average speed for a tow truck
  return {
    distance: distance,
    duration: (distance / AVG_SPEED) * 3600, // Convert to seconds
    geometry: generateFallbackGeometry(start, end)
  };
};

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    };
  } catch (error) {
    console.error('Error fetching route:', error);
    // Use fallback calculation with road factor
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };