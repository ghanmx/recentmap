import { useEffect, useState } from 'react'

export function useBase<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const reset = () => {
    setValue(initialValue)
    setError(null)
    setLoading(false)
  }

  return {
    value,
    setValue,
    error,
    setError,
    loading,
    setLoading,
    reset,
  }
}

export function useAsync<T>(asyncFn: () => Promise<T>, immediate = true) {
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const execute = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFn()
      setValue(result)
      return result
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate])

  return {
    value,
    error,
    loading,
    execute,
  }
}
