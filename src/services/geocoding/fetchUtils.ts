export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 8000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    console.log('Fetching URL:', url)
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
    console.log('Fetch successful:', { url, status: response.status })
    return data
  } catch (error) {
    console.error('Fetch failed:', { url, error })
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

export const exponentialBackoff = (attempt: number) => {
  const delay = Math.min(1000 * Math.pow(2, attempt), 5000) // Cap at 5 seconds
  return new Promise(resolve => setTimeout(resolve, delay))
}