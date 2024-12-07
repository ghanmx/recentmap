import { CORS_PROXIES, DEFAULT_RETRY_COUNT, DEFAULT_TIMEOUT } from './proxyConfig'
import { fetchWithTimeout, exponentialBackoff } from './fetchUtils'

export const tryFetchWithProxies = async (url: string, retryCount = DEFAULT_RETRY_COUNT) => {
  let lastError: Error | null = null
  
  for (const proxyUrl of CORS_PROXIES) {
    const proxiedUrl = `${proxyUrl}${encodeURIComponent(url)}`
    console.log('Trying proxy:', proxyUrl)

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const response = await fetchWithTimeout(proxiedUrl, {}, DEFAULT_TIMEOUT)
        console.log('Successful response from proxy:', proxyUrl)
        return response
      } catch (error) {
        console.warn(`Failed attempt ${attempt + 1} with proxy ${proxyUrl}:`, error)
        lastError = error as Error
        
        if (attempt < retryCount - 1) {
          console.log(`Waiting before retry ${attempt + 1}...`)
          await exponentialBackoff(attempt)
        }
      }
    }
  }

  console.error('All proxies failed:', lastError)
  throw new Error('Failed to fetch data from all available proxies')
}