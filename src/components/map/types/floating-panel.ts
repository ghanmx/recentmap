import { ReactNode } from 'react'

export interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right'
  title?: ReactNode | string
}

export interface FloatingPanelHeaderProps {
  title: string
  isCollapsed: boolean
  isMaximized: boolean
  isDragging?: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  onDetailsToggle?: () => void
}

export interface FloatingPanelContentProps {
  children: ReactNode
}

export interface FloatingPanelControlsProps {
  isCollapsed: boolean
  isMaximized: boolean
  isDragging: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  title: string
  onDetailsToggle?: () => void
  className?: string
  onSave?: () => void
  onCancel?: () => void
}