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
      }
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, REQUEST_TIMEOUT);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error;
    }
    await wait(RETRY_DELAY * (i + 1)); // Exponential backoff
  }
  throw new Error('Max retries reached');
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  try {
    // Try multiple routing services
    const services = [
      'https://routing.openstreetmap.de/routed-car',
      'https://router.project-osrm.org'
    ];

    for (const baseUrl of services) {
      try {
        const path = `/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`;
        const params = '?overview=full&geometries=polyline&alternatives=true';
        const url = `${baseUrl}${path}${params}`;

        const response = await fetchWithRetry(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const bestRoute = data.routes[0];
          return {
            distance: (bestRoute.distance / 1000) * 1.15, // Convert to km and add 15% for accuracy
            duration: bestRoute.duration,
            geometry: bestRoute.geometry,
          };
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${baseUrl}, trying next service...`);
        continue;
      }
    }

    console.warn('All routing services failed, using fallback calculation');
    return createFallbackResponse(start, end);
  } catch (error) {
    console.warn('Error fetching route, using fallback calculation:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };