import { ReactNode } from 'react'
import { useTowing } from '@/contexts/towing/TowingContext'
import { Alert } from '@/components/ui/alert'

interface TowingWrapperProps {
  children: ReactNode
}

export const TowingWrapper = ({ children }: TowingWrapperProps) => {
  try {
    useTowing()
    return <>{children}</>
  } catch (error) {
    console.error('TowingWrapper error:', error)
    return (
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive" className="max-w-md">
          <h2 className="text-xl font-semibold mb-2">
            Error al cargar el mapa
          </h2>
          <p className="text-sm">
            Por favor, actualice la página o intente nuevamente.
          </p>
        </Alert>
      </div>
    )
  }
}