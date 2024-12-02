import { TollLocation } from '@/types/toll'

export interface FloatingPanelProps {
  children: React.ReactNode
  title: string
  position?: 'left' | 'right'
  className?: string
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
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  onDetailsToggle?: () => void
  isCollapsed: boolean
  isMaximized: boolean
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