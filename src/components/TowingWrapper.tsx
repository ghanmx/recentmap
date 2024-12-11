import { ReactNode } from 'react'
import { TowingProvider } from '../contexts/TowingContext'

interface TowingWrapperProps {
  children: ReactNode
}

export const TowingWrapper = ({ children }: TowingWrapperProps) => {
  return <TowingProvider>{children}</TowingProvider>
}
