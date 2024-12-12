import { ReactNode } from 'react'
import { useTowing } from '@/contexts/towing/TowingContext'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

interface TowingWrapperProps {
  children: ReactNode
}

export const TowingWrapper = ({ children }: TowingWrapperProps) => {
  const navigate = useNavigate()
  
  try {
    useTowing()
    return <>{children}</>
  } catch (error) {
    console.error('TowingWrapper error:', error)
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle className="text-xl font-semibold mb-2">
            Error al cargar el mapa
          </AlertTitle>
          <AlertDescription className="space-y-4">
            <p className="text-sm">
              Hubo un problema al inicializar el componente del mapa. Por favor, intente nuevamente.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full mt-4"
            >
              Volver al inicio
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}