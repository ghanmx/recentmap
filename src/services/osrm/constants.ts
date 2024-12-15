export const OSRM_API_URLS = [
  'https://router.project-osrm.org/route/v1',
  'http://router.project-osrm.org/route/v1',
].map((url) => url.replace(/\/+$/, ''))

export const MIN_REQUEST_INTERVAL = 1100
export const MAX_RETRIES = 3
export const BACKOFF_FACTOR = 2