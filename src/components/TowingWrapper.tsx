import { ReactNode } from 'react'
import { useTowing } from '@/contexts/towing/TowingContext'

interface TowingWrapperProps {
  children: ReactNode
}

export const TowingWrapper = ({ children }: TowingWrapperProps) => {
  try {
    // Verify towing context is available
    useTowing()
    return <>{children}</>
  } catch (error) {
    console.error('TowingWrapper error:', error)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Map
          </h2>
          <p className="text-gray-600">
            Please refresh the page or try again later.
          </p>
        </div>
      </div>
    )
  }
}