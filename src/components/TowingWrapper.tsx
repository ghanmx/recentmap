import { ReactNode } from 'react'

interface TowingWrapperProps {
  children: ReactNode
}

export const TowingWrapper = ({ children }: TowingWrapperProps) => {
  return <>{children}</>
}