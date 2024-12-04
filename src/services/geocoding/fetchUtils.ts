import { DEFAULT_TIMEOUT } from './proxyConfig'

export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApplication/1.0',
        'origin': window.location.origin,
        'x-requested-with': 'XMLHttpRequest'
      },
    })
    clearTimeout(id)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export const exponentialBackoff = (attempt: number) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
}