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
const RETRY_DELAY = 2000;
const FALLBACK_SPEED_KMH = 45;
const REQUEST_TIMEOUT = 15000;

// Added more routing servers as fallbacks
const OSRM_SERVERS = [
  'https://router.project-osrm.org',
  'https://routing.openstreetmap.de/routed-car',
  'https://osrm.learningdatabase.dev'
];

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
  const points = [
    [start.lat, start.lng],
    [(start.lat + end.lat) / 2, (start.lng + end.lng) / 2],
    [end.lat, end.lng]
  ];
  return btoa(JSON.stringify(points));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  const MEXICAN_ROADS_FACTOR = 1.4;
  const adjustedDistance = distance * MEXICAN_ROADS_FACTOR;
  const duration = (adjustedDistance / FALLBACK_SPEED_KMH) * 3600;

  return {
    distance: adjustedDistance,
    duration,
    geometry: generateFallbackGeometry(start, end)
  };
};

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApp/1.0'
      },
      mode: 'cors'  // Added CORS mode explicitly
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function tryFetchRoute(start: Location, end: Location, serverUrl: string): Promise<RouteResponse> {
  const path = `/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`;
  const params = '?overview=full&geometries=polyline&alternatives=true';
  const url = `${serverUrl}${path}${params}`;

  try {
    const response = await fetchWithTimeout(url, REQUEST_TIMEOUT);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No routes found');
    }

    const bestRoute = data.routes[0];
    return {
      distance: (bestRoute.distance / 1000) * 1.15, // Convert to km and add 15% for accuracy
      duration: bestRoute.duration,
      geometry: bestRoute.geometry,
    };
  } catch (error) {
    throw new Error(`Failed to fetch route from ${serverUrl}: ${error.message}`);
  }
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  let lastError;

  // Try each server in sequence
  for (const serverUrl of OSRM_SERVERS) {
    try {
      return await tryFetchRoute(start, end, serverUrl);
    } catch (error) {
      console.warn(`Failed to fetch from ${serverUrl}, trying next server...`, error);
      lastError = error;
      await wait(RETRY_DELAY);
      continue;
    }
  }

  // If all servers fail, use fallback calculation
  console.warn('All routing servers failed, using fallback calculation', lastError);
  return createFallbackResponse(start, end);
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };