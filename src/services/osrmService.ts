const OSRM_API_URLS = [
  'https://routing.openstreetmap.de/routed-car/route/v1/driving',
  'https://router.project-osrm.org/route/v1/driving'
];

const MIN_REQUEST_INTERVAL = 1100; // Slightly over 1 second to be safe
const MAX_RETRIES = 3;
const BACKOFF_FACTOR = 2;
let lastRequestTime = 0;
let requestQueue: Promise<any> = Promise.resolve();

interface Coordinates {
  lat: number;
  lng: number;
}

interface OSRMResponse {
  routes: {
    distance: number;
    duration: number;
    geometry: string;
  }[];
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateBackoffDelay = (attempt: number): number => {
  return Math.min(MIN_REQUEST_INTERVAL * Math.pow(BACKOFF_FACTOR, attempt), 5000);
};

const enforceRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  lastRequestTime = Date.now();
};

async function tryFetchWithUrls(urls: string[], coordinates: string, options: RequestInit, attempt = 0): Promise<Response> {
  const errors: Error[] = [];

  // Enforce rate limiting
  await enforceRateLimit();

  for (const baseUrl of urls) {
    try {


      const url = `${baseUrl}/${coordinates}?overview=full&geometries=polyline`;

      const response = await fetch(url, {
        ...options,
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TowingServiceApplication/1.0',
          'Referer': 'https://mrgruas.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle rate limiting
      if (response.status === 429) {
        const backoffDelay = calculateBackoffDelay(attempt);
        await wait(backoffDelay);
        if (attempt < MAX_RETRIES) {
          return tryFetchWithUrls(urls, coordinates, options, attempt + 1);
        }
      }

      return response;
    } catch (error) {
      console.error(`Error with ${baseUrl}:`, error);
      errors.push(error instanceof Error ? error : new Error(`Unknown error from ${baseUrl}`));
      continue;
    }
  }





  if (attempt < MAX_RETRIES) {
    console.log(`Retrying request, attempt ${attempt + 1} of ${MAX_RETRIES}`);
    const backoffDelay = calculateBackoffDelay(attempt);
    await wait(backoffDelay);
    return tryFetchWithUrls(urls, coordinates, options, attempt + 1);
  }

  throw new Error(`All routing services failed after ${MAX_RETRIES} retries. Errors: ${errors.map(e => e.message).join(', ')}`);
}

export async function getRouteFromOSRM(start: Coordinates, end: Coordinates): Promise<{
  distance: number;
  duration: number;
  geometry: string;
}> {
  const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;















  try {
    // Queue this request
    const result = await new Promise((resolve, reject) => {
      requestQueue = requestQueue
        .then(() => tryFetchWithUrls(OSRM_API_URLS, coordinates, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'TowingServiceApplication/1.0',
            'Referer': 'https://mrgruas.com'
          }
        }))
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });


    const data = result as OSRMResponse;








    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found between the specified locations.');
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    };

  } catch (error) {
    throw error;
  }
}