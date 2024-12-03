import { ReactNode } from 'react'

export interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right'
  title?: string
}

export interface FloatingPanelHeaderProps {
  title: string
  isCollapsed: boolean
  isMaximized: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  onDetailsToggle?: () => void
}

export interface FloatingPanelContentProps {
  children: ReactNode
}