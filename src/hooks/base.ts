// src/hooks/base.ts
import { useState, useEffect } from 'react'

// Ejemplo de un hook básico en React
export function useExample() {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    // Aquí se puede agregar la lógica del hook
    console.log('El valor es:', value)
  }, [value])

  return [value, setValue] as const
}
