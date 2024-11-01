interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

// Rate limiting setup
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1100; // 1.1 seconds between requests

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateStraightLineDistance = (start: Location, end: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Number((R * c).toFixed(2));
};

const generateFallbackGeometry = (start: Location, end: Location): string => {
  const midLat = (start.lat + end.lat) / 2;
  const midLng = (start.lng + end.lng) / 2;
  const offset = 0.01;
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
    duration: (distance / AVG_SPEED) * 3600,
    geometry: generateFallbackGeometry(start, end)
  };
};

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  // Implement rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  
  try {
    lastRequestTime = Date.now();
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`,
      {
        headers: {
          'User-Agent': 'TowingServiceApp/1.0',
          'Referer': window.location.origin
        }
      }
    );
    
    if (!response.ok) {
      if (response.status === 429) {
        console.warn('Rate limit exceeded, using fallback calculation');
        return createFallbackResponse(start, end);
      }
      throw new Error('Failed to fetch route');
    }

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      return createFallbackResponse(start, end);
    }

    return {
      distance: data.routes[0].distance / 1000,
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    };
  } catch (error) {
    console.warn('Error fetching route, using fallback calculation:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };