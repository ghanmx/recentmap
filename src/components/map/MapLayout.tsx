import { ReactNode } from 'react'

interface MapLayoutProps {
  children: ReactNode
}

export const MapLayout = ({ children }: MapLayoutProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative h-full w-full lg:pl-96 transition-all duration-300">
        {children}
      </div>
    </div>
  )
}
