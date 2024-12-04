import { CORS_PROXIES, DEFAULT_RETRY_COUNT } from './proxyConfig'
import { fetchWithTimeout, exponentialBackoff } from './fetchUtils'

export const tryFetchWithProxies = async (url: string, retryCount = DEFAULT_RETRY_COUNT) => {
  let lastError

  for (const proxyUrl of CORS_PROXIES) {
    const proxiedUrl = `${proxyUrl}${encodeURIComponent(url)}`

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        return await fetchWithTimeout(proxiedUrl)
      } catch (error) {
        lastError = error
        console.warn(`Failed attempt ${attempt + 1} with proxy ${proxyUrl}:`, error)
        
        if (attempt < retryCount - 1) {
          await exponentialBackoff(attempt)
        }
      }
    }
  }

  throw lastError
}