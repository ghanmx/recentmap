import { ReactNode } from 'react'

export interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right'
  title?: ReactNode
}

export interface FloatingPanelControlsProps {
  isCollapsed: boolean
  isMaximized: boolean
  isDragging: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  title?: ReactNode
  className?: string
  onSave?: () => void
  onCancel?: () => void
  onDetailsToggle?: () => void
}