import { CORS_PROXIES, DEFAULT_RETRY_COUNT } from './proxyConfig'
import { fetchWithTimeout, exponentialBackoff } from './fetchUtils'

export const tryFetchWithProxies = async (url: string, retryCount = DEFAULT_RETRY_COUNT) => {
  let lastError

  for (const proxyUrl of CORS_PROXIES) {
    const proxiedUrl = `${proxyUrl}${encodeURIComponent(url)}`
    console.log('Trying proxy:', proxyUrl)

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const response = await fetchWithTimeout(proxiedUrl)
        console.log('Successful response from proxy:', proxyUrl)
        return response
      } catch (error) {
        lastError = error
        console.warn(`Failed attempt ${attempt + 1} with proxy ${proxyUrl}:`, error)
        
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