import { ReactNode } from 'react'

export interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right'
  title?: ReactNode
}

export interface FloatingPanelHeaderProps {
  title?: ReactNode
  isCollapsed: boolean
  isMaximized: boolean
  isDragging: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
}