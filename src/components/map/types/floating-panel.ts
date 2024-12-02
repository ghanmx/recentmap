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

export interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (selecting: boolean) => void
  setSelectingDrop: (selecting: boolean) => void
}