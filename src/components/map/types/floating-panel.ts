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
}

export interface FloatingPanelHeaderProps {
  title: string
  onDetailsToggle: () => void
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
}