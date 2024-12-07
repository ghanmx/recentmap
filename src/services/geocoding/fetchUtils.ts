export const DEFAULT_TIMEOUT = 15000 // Increased from 8000ms to 15000ms

export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApplication/1.0',
        'origin': window.location.origin,
        'x-requested-with': 'XMLHttpRequest',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } finally {
    clearTimeout(timeoutId)
  }
}

export const exponentialBackoff = (attempt: number) => {
  const delay = Math.min(1000 * Math.pow(2, attempt), 10000) // Cap at 10 seconds
  return new Promise(resolve => setTimeout(resolve, delay))
}