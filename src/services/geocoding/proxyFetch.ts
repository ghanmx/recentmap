import { CORS_PROXIES, DEFAULT_RETRY_COUNT } from './proxyConfig'
import { fetchWithTimeout, exponentialBackoff } from './fetchUtils'

export const tryFetchWithProxies = async (url: string, retryCount = DEFAULT_RETRY_COUNT) => {
  let lastError: Error | null = null
  
  for (const proxyUrl of CORS_PROXIES) {
    const proxiedUrl = `${proxyUrl}${encodeURIComponent(url)}`
    console.log('Attempting proxy:', proxyUrl)

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const response = await fetchWithTimeout(proxiedUrl)
        console.log('Proxy successful:', proxyUrl)
        return response
      } catch (error) {
        console.warn(`Proxy attempt ${attempt + 1} failed for ${proxyUrl}:`, error)
        lastError = error as Error
        
        if (attempt < retryCount - 1) {
          const backoffTime = Math.pow(2, attempt) * 1000
          console.log(`Retrying in ${backoffTime}ms...`)
          await exponentialBackoff(attempt)
        }
      }
    }
  }

  console.error('All proxies failed:', lastError)
  throw new Error('Failed to fetch data from all available proxies')
}