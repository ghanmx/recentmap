import { ReactNode } from 'react'
import { TowingProvider } from '@/contexts/towing/TowingContext'

interface TowingWrapperProps {
  children: ReactNode
}

export const TowingWrapper = ({ children }: TowingWrapperProps) => {
  return <TowingProvider>{children}</TowingProvider>
}