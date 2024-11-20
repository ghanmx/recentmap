interface GeocodingOptions {
  fuzzyMatch?: boolean;
  limit?: number;
  countryCode?: string;
  proximity?: { lat: number; lng: number };
  language?: string;
  viewbox?: { minLon: number; minLat: number; maxLon: number; maxLat: number };
  bounded?: boolean;
}

const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org';
const NUEVO_LEON_COORDS = { lat: 25.5922, lng: -99.9962 };
const GEOCODING_DELAY = 1000;
const DEFAULT_VIEWBOX = { minLon: -100.5, minLat: 25.0, maxLon: -99.5, maxLat: 26.0 };
let lastRequestTime = 0;

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options?: RequestInit, retries = 3): Promise<Response> => {
  const defaultHeaders = {
    Accept: 'application/json',
    'User-Agent': 'MRGruas Application (https://mrgruas.github.io)',
    Referer: 'https://mrgruas.github.io',
    Origin: window.location.origin,
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...defaultHeaders, ...options?.headers },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        return new Response(
          JSON.stringify([
            {
              lat: NUEVO_LEON_COORDS.lat,
              lon: NUEVO_LEON_COORDS.lng,
              display_name: 'Ubicación en Nuevo León',
              importance: 0.5,
            },
          ]),
        );
      }
      await wait(1000 * Math.pow(2, i));
    }
  }
  throw new Error('Max retries reached');
};

export const getAddressFromCoordinates = async (
  lat: number,
  lng: number,
  options: GeocodingOptions = {},
): Promise<string> => {
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < GEOCODING_DELAY) {
    await wait(GEOCODING_DELAY - timeSinceLastRequest);
  }

  try {
    lastRequestTime = Date.now();
    const params = new URLSearchParams({
      format: 'json',
      lat: lat.toString(),
      lon: lng.toString(),
      'accept-language': options.language || 'es',
    });

    const response = await fetchWithRetry(
      `${FALLBACK_GEOCODING_URL}/reverse?${params.toString()}`,
    );

    const data = await response.json();
    return data.display_name || 'Ubicación seleccionada';
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Ubicación seleccionada';
  }
};

export const searchAddresses = async (
  query: string,
  options: GeocodingOptions = {},
): Promise<
  Array<{
    address: string;
    lat: number;
    lon: number;
    distance: number;
    importance?: number;
  }>
> => {
  if (!query || query.length < 3) return [];

  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < GEOCODING_DELAY) {
    await wait(GEOCODING_DELAY - timeSinceLastRequest);
  }

  try {
    lastRequestTime = Date.now();
    const enhancedQuery = `${query}, Nuevo Leon, Mexico`;

    const params = new URLSearchParams({
      format: 'json',
      q: enhancedQuery,
      limit: (options.limit || 10).toString(),
      'accept-language': options.language || 'es',
      countrycodes: options.countryCode || 'mx',
      bounded: '1',
      viewbox: `${DEFAULT_VIEWBOX.minLon},${DEFAULT_VIEWBOX.maxLat},${DEFAULT_VIEWBOX.maxLon},${DEFAULT_VIEWBOX.minLat}`,
    });

    const response = await fetchWithRetry(
      `${FALLBACK_GEOCODING_URL}/search?${params.toString()}`,
    );

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn('Received non-array response:', data);
      return [];
    }

    const results = data.map((item: any) => ({
      address: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      distance: calculateDistance(
        parseFloat(item.lat),
        parseFloat(item.lon),
        NUEVO_LEON_COORDS.lat,
        NUEVO_LEON_COORDS.lng,
      ),
      importance: item.importance || 0,
    }));

    return results
      .filter((result) => !isNaN(result.lat) && !isNaN(result.lon))
      .sort((a, b) => {
        const distanceWeight = options.proximity ? 0.7 : 0.5;
        const importanceWeight = 1 - distanceWeight;

        const scoreA =
          distanceWeight * (1 / (a.distance + 1)) +
          importanceWeight * (a.importance || 0);
        const scoreB =
          distanceWeight * (1 / (b.distance + 1)) +
          importanceWeight * (b.importance || 0);

        return scoreB - scoreA;
      });
  } catch (error) {
    console.error('Error searching addresses:', error);
    return [
      {
        address: 'Nuevo León, México',
        lat: NUEVO_LEON_COORDS.lat,
        lon: NUEVO_LEON_COORDS.lng,
        distance: 0,
      },
    ];
  }
};