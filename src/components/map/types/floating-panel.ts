import { ReactNode } from 'react'

export interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
}

export interface FloatingPanelControlsProps {
  isCollapsed: boolean
  isMaximized: boolean
  isDragging: boolean // This was missing
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  title: string
}
export interface FloatingPanelControlsProps {
  isCollapsed: boolean
  isMaximized: boolean
  isDragging: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void

  title: string
  className?: string // For styling flexibility
  showCostDetails?: boolean // For controlling cost details visibility
  onCostDetailsChange?: (show: boolean) => void // For parent control
}
