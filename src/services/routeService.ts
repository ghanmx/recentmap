interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

// Fallback calculation using Haversine formula
const calculateStraightLineDistance = (start: Location, end: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Generate a simple straight line geometry for fallback
const generateFallbackGeometry = (start: Location, end: Location): string => {
  // Create a simple two-point polyline
  const points = [
    [start.lat.toFixed(6), start.lng.toFixed(6)],
    [end.lat.toFixed(6), end.lng.toFixed(6)]
  ];
  return encodeURIComponent(JSON.stringify(points));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  return {
    distance: distance,
    duration: distance * 60, // Rough estimate: 1 km/minute
    geometry: generateFallbackGeometry(start, end)
  };
};

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const baseUrl = 'https://router.project-osrm.org/route/v1/driving/';
  const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
  const params = '?overview=full&geometries=polyline';
  
  try {
    const response = await fetch(
      `${proxyUrl}${encodeURIComponent(baseUrl + coordinates + params)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      console.warn('OSRM service unavailable, using fallback calculation');
      return createFallbackResponse(start, end);
    }

    const data = await response.json();
    
    if (!data.routes?.length) {
      console.warn('No route found, using fallback calculation');
      return createFallbackResponse(start, end);
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry
    };
  } catch (error) {
    console.warn('Route calculation failed, using fallback:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };