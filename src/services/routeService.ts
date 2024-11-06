interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

const MIN_REQUEST_INTERVAL = 1500; // 1.5 seconds between requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;
const FALLBACK_SPEED_KMH = 45;
const REQUEST_TIMEOUT = 30000;

// Queue for managing requests
let requestQueue: Array<() => Promise<any>> = [];
let isProcessingQueue = false;

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
        'User-Agent': 'MRGruas-TowingService/1.0 (https://mrgruas.com)',
        'Referer': 'https://mrgruas.com'
      }
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      try {
        await request();
      } catch (error) {
        console.error('Error processing queued request:', error);
      }
      await wait(MIN_REQUEST_INTERVAL);
    }
  }
  
  isProcessingQueue = false;
}

async function tryFetchRoute(start: Location, end: Location, serverUrl: string, retryCount = 0): Promise<RouteResponse> {
  const path = `/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`;
  const params = '?overview=full&geometries=polyline&alternatives=true';
  const url = `${serverUrl}${path}${params}`;

  try {
    const response = await fetchWithTimeout(url, REQUEST_TIMEOUT);
    
    if (response.status === 429) {
      if (retryCount < MAX_RETRIES) {
        await wait(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
        return tryFetchRoute(start, end, serverUrl, retryCount + 1);
      }
      throw new Error('Rate limit exceeded after retries');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No routes found');
    }

    const bestRoute = data.routes[0];
    return {
      distance: (bestRoute.distance / 1000) * 1.15,
      duration: bestRoute.duration,
      geometry: bestRoute.geometry,
    };
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await wait(RETRY_DELAY * (retryCount + 1));
      return tryFetchRoute(start, end, serverUrl, retryCount + 1);
    }
    throw error;
  }
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  return new Promise((resolve, reject) => {
    const request = async () => {
      for (const serverUrl of OSRM_SERVERS) {
        try {
          const result = await tryFetchRoute(start, end, serverUrl);
          resolve(result);
          return;
        } catch (error) {
          console.warn(`Failed to fetch from ${serverUrl}, trying next server...`, error);
          continue;
        }
      }
      
      console.warn('All routing servers failed, using fallback calculation');
      resolve(createFallbackResponse(start, end));
    };

    requestQueue.push(request);
    processQueue();
  });
};

export const getRouteGeometry = async (pickupLocation: Location, dropLocation: Location) => {
  try {
    const route = await getRouteDetails(pickupLocation, dropLocation);
    return {
      companyToPickupDistance: route.distance,
      pickupToDropDistance: route.distance,
      dropToCompanyDistance: route.distance,
      companyToPickupGeometry: route.geometry,
      pickupToDropGeometry: route.geometry,
      dropToCompanyGeometry: route.geometry,
    };
  } catch (error) {
    console.error('Error getting route geometry:', error);
    const fallback = createFallbackResponse(pickupLocation, dropLocation);
    return {
      companyToPickupDistance: fallback.distance,
      pickupToDropDistance: fallback.distance,
      dropToCompanyDistance: fallback.distance,
      companyToPickupGeometry: fallback.geometry,
      pickupToDropGeometry: fallback.geometry,
      dropToCompanyGeometry: fallback.geometry,
    };
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };