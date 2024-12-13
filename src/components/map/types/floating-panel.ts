import { ReactNode } from 'react'

export interface FloatingPanelProps {
  isCollapsed?: boolean
  isMaximized?: boolean
  isDragging?: boolean
  onCollapse?: () => void
  onMaximize?: () => void
  onClose?: () => void
  title?: ReactNode
  className?: string
  children?: ReactNode
}

export interface FloatingPanelControlsProps extends FloatingPanelProps {
  onSave?: () => void
  onCancel?: () => void
  onDetailsToggle?: () => void
  children?: ReactNode
}