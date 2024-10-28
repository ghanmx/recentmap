interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

// Queue for managing requests
let requestQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      // Wait 1.1 seconds between requests to respect rate limit
      await delay(1100);
    }
  }
  isProcessingQueue = false;
};

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  return new Promise((resolve, reject) => {
    const makeRequest = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`,
          {
            headers: {
              'User-Agent': 'TowTruckService/1.0',
              'Referer': window.location.origin
            }
          }
        );

        if (response.status === 429) {
          // If rate limited, add back to queue and try again later
          requestQueue.push(makeRequest);
          processQueue();
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }

        const data = await response.json();
        
        if (!data.routes || data.routes.length === 0) {
          throw new Error('No route found');
        }

        resolve({
          distance: data.routes[0].distance / 1000, // Convert to kilometers
          duration: data.routes[0].duration,
          geometry: data.routes[0].geometry
        });
      } catch (error) {
        // For other errors, fall back to straight-line distance
        const straightLineDistance = calculateStraightLineDistance(start, end);
        resolve({
          distance: straightLineDistance,
          duration: straightLineDistance * 60, // Rough estimate: 1 km/minute
          geometry: '' // Empty geometry for straight line
        });
      }
    };

    requestQueue.push(makeRequest);
    processQueue();
  });
};

const calculateStraightLineDistance = (point1: Location, point2: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Number((R * c).toFixed(2));
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };