export interface FloatingPanelProps {
  children: React.ReactNode
  className?: string
  position?: 'right' | 'left' | 'top' | 'bottom'
  title?: string
}

export interface FloatingPanelControlsProps {
  onClose: () => void
  onSave?: () => void
  onCancel?: () => void
  className?: string
  isCollapsed?: boolean
  isMaximized?: boolean
  isDragging?: boolean
  onCollapse?: () => void
  onMaximize?: () => void
  title?: string
}

export interface FloatingPanelHeaderProps {
  title: string
  onDetailsToggle?: () => void
}

export interface CostDetailsContentProps {
  baseCost: number
  flagDropFee: number
  maneuverCost: number
  totalTollCost: number
  subtotal: number
  detectedTolls: TollLocation[]
}