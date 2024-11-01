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
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

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
  // Create a simple straight line path between points
  const points = [
    [start.lat, start.lng],
    [end.lat, end.lng]
  ];
  return btoa(JSON.stringify(points));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  const AVG_SPEED = 50; // km/h average speed for a tow truck
  return {
    distance: distance * 1.3, // Add 30% to account for road curves
    duration: (distance / AVG_SPEED) * 3600,
    geometry: generateFallbackGeometry(start, end)
  };
};

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } catch (error) {
    if (retries > 0) {
      await wait(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  // Implement rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  
  try {
    lastRequestTime = Date.now();
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`;
    
    const response = await fetchWithRetry(url, {
      headers: {
        'User-Agent': 'TowingServiceApp/1.0',
      }
    });

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      console.warn('No route found, using fallback calculation');
      return createFallbackResponse(start, end);
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    };
  } catch (error) {
    console.warn('Error fetching route, using fallback calculation:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };