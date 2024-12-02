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
  onDetailsToggle?: () => void
}

export interface FloatingPanelHeaderProps {
  title: string
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

export interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
  onPickupClick?: () => void
  onDropClick?: () => void
}