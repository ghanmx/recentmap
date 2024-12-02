import { TollLocation } from '@/types/location'

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
}

export interface FloatingPanelHeaderProps {
  title: string
  onCollapse?: () => void
}

export interface CostDetailsContentProps {
  baseCost: number
  flagDropFee: number
  maneuverCost: number
  totalTollCost: number
  detectedTolls: TollLocation[]
}