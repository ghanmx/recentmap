import { TollLocation } from '@/types/toll'

export interface FloatingPanelProps {
  children: React.ReactNode
  className?: string
  position?: 'left' | 'right'
  title?: string
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

export interface CostDetailsContentProps {
  baseCost: number
  flagDropFee: number
  maneuverCost: number
  totalTollCost: number
  subtotal: number
  detectedTolls: TollLocation[]
  totalDistance?: number
  requiresManeuver?: boolean
}