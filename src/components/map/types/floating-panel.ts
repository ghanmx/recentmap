import { Location } from '@/types/location'

export interface FloatingPanelProps {
  children: React.ReactNode
  className?: string
  position?: 'right' | 'left' | 'top' | 'bottom'
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
}

export interface CostDetailsContentProps {
  baseCost: number
  flagDropFee: number
  maneuverCost: number
  totalTollCost: number
  subtotal: number
  detectedTolls: Location[]
}