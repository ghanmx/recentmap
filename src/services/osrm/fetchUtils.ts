import { OSRM_API_URLS, MAX_RETRIES } from './constants'
import { wait, calculateBackoffDelay } from './utils'

export async function tryFetchWithUrls(
  urls: string[],
  coordinates: string,
  options: RequestInit,
  attempt = 0,
): Promise<Response> {
  const errors: Error[] = []

  for (const baseUrl of urls) {
    try {
      const url = `${baseUrl}/driving/${coordinates}?overview=full&geometries=polyline`
      console.log('Attempting request to:', url)

      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...options.headers,
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
      })

      if (response.ok) {
        return response
      }

      if (response.status === 429 && attempt < MAX_RETRIES) {
        const backoffDelay = calculateBackoffDelay(attempt)
        await wait(backoffDelay)
        return tryFetchWithUrls(urls, coordinates, options, attempt + 1)
      }

      const errorText = await response.text()
      console.error(`OSRM error (${response.status}):`, errorText)
      errors.push(new Error(`HTTP error! status: ${response.status}`))
    } catch (error) {
      console.error('Error making request to', baseUrl, ':', error)
      errors.push(error instanceof Error ? error : new Error(`Unknown error from ${baseUrl}`))
    }
  }

  throw new Error('All routing services failed. Using fallback straight-line calculation.')
}