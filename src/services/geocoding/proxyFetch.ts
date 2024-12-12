import { CORS_PROXIES, DEFAULT_TIMEOUT } from './proxyConfig'

export const tryFetchWithProxies = async (url: string, retryCount = 3) => {
  let lastError: Error | null = null
  
  // Try each proxy in sequence
  for (const proxyUrl of CORS_PROXIES) {
    const proxiedUrl = `${proxyUrl}${encodeURIComponent(url)}`
    console.log('Attempting proxy:', proxyUrl)

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

        const response = await fetch(proxiedUrl, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'TowingServiceApplication/1.0',
          }
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Proxy successful:', proxyUrl)
        return data
      } catch (error) {
        console.warn(`Proxy attempt ${attempt + 1} failed for ${proxyUrl}:`, error)
        lastError = error as Error
        
        if (attempt < retryCount - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }
  }

  console.error('All proxies failed:', lastError)
  throw new Error('Failed to fetch data from all available proxies')
}