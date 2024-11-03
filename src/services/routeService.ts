interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

const MIN_REQUEST_INTERVAL = 1100;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const FALLBACK_SPEED_KMH = 45;
const REQUEST_TIMEOUT = 15000;

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
  // Create a simple straight line polyline
  const points = [
    [start.lat, start.lng],
    [(start.lat + end.lat) / 2, (start.lng + end.lng) / 2],
    [end.lat, end.lng]
  ];
  return btoa(JSON.stringify(points));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  const MEXICAN_ROADS_FACTOR = 1.4; // Adjustment factor for actual road distance
  const adjustedDistance = distance * MEXICAN_ROADS_FACTOR;
  const duration = (adjustedDistance / FALLBACK_SPEED_KMH) * 3600;

  return {
    distance: adjustedDistance,
    duration,
    geometry: generateFallbackGeometry(start, end)
  };
};

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApp/1.0'
      },
      mode: 'cors',
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying route fetch, ${retries} attempts remaining`);
      await wait(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  try {
    // Use a different OSRM server that allows CORS
    const baseUrl = 'https://routing.openstreetmap.de';
    const path = `/routed-car/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`;
    const params = '?overview=full&geometries=polyline&alternatives=true';
    const url = `${baseUrl}${path}${params}`;

    const response = await fetchWithRetry(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      console.warn('No routes found, using fallback calculation');
      return createFallbackResponse(start, end);
    }

    const bestRoute = data.routes.reduce((best: any, current: any) => {
      const currentScore = current.duration / current.distance;
      const bestScore = best.duration / best.distance;
      return currentScore < bestScore ? current : best;
    }, data.routes[0]);

    return {
      distance: (bestRoute.distance / 1000) * 1.15, // Convert to km and add 15% for accuracy
      duration: bestRoute.duration,
      geometry: bestRoute.geometry,
    };
  } catch (error) {
    console.warn('Error fetching route, using fallback calculation:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };