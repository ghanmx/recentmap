import React from 'react'
import { TowingProvider } from '../contexts/TowingContext'

interface TowingWrapperProps {
  children: React.ReactNode
}

export const TowingWrapper: React.FC<TowingWrapperProps> = ({
  children,
}) => {
  return <TowingProvider>{children}</TowingProvider>
}
