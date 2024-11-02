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
const MIN_REQUEST_INTERVAL = 1100;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateStraightLineDistance = (start: Location, end: Location): number => {
  const R = 6371;
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
  const points = [[start.lat, start.lng], [end.lat, end.lng]];
  return btoa(JSON.stringify(points));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  const MEXICAN_ROADS_FACTOR = 1.4; // Adjustment factor for Mexican road conditions
  return {
    distance: distance * MEXICAN_ROADS_FACTOR,
    duration: (distance / 45) * 3600, // Assuming 45 km/h average speed on Mexican roads
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
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  
  try {
    lastRequestTime = Date.now();
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline&alternatives=true`;
    
    const response = await fetchWithRetry(url, {
      headers: {
        'User-Agent': 'TowingServiceApp/1.0',
      }
    });

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      return createFallbackResponse(start, end);
    }

    // Select the best route considering Mexican road conditions
    const bestRoute = data.routes.reduce((best: any, current: any) => {
      const currentScore = current.duration / current.distance; // Lower is better
      const bestScore = best.duration / best.distance;
      return currentScore < bestScore ? current : best;
    }, data.routes[0]);

    return {
      distance: (bestRoute.distance / 1000) * 1.15, // Add 15% for Mexican road conditions
      duration: bestRoute.duration,
      geometry: bestRoute.geometry,
    };
  } catch (error) {
    console.warn('Error fetching route, using fallback calculation:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };