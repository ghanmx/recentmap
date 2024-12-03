import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useTowing } from '@/contexts/TowingContext'
import { towTruckTypes } from '@/utils/towTruckPricing'
import { FloatingPanelHeader } from './FloatingPanelHeader'
import { CostDetailsContent } from './CostDetailsContent'
import { FloatingPanelControlsProps } from './types/floating-panel'

export const FloatingPanelControls: React.FC<FloatingPanelControlsProps> = ({
  isCollapsed,
  isMaximized,
  isDragging,
  onCollapse,
  onMaximize,
  onClose,
  title,
  className,
  onSave,
  onCancel,
  onDetailsToggle,
}) => {
  const [showCostDetails, setShowCostDetails] = useState(false)
  const {
    totalDistance,
    truckType,
    requiresManeuver,
    totalTollCost,
    detectedTolls,
  } = useTowing()

  const selectedTruck = towTruckTypes[truckType || 'A']
  const baseCost = totalDistance * selectedTruck.perKm
  const flagDropFee = selectedTruck.flagDropFee
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0
  const subtotal = baseCost + flagDropFee + maneuverCost + totalTollCost

  const handleDetailsToggle = () => {
    setShowCostDetails((prev) => !prev)
    onDetailsToggle?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('p-4 border-t bg-white shadow rounded-lg', className)}
    >
      <FloatingPanelHeader
        title={title}
        isCollapsed={isCollapsed}
        isMaximized={isMaximized}
        onCollapse={onCollapse}
        onMaximize={onMaximize}
        onClose={onClose}
        onDetailsToggle={handleDetailsToggle}
      />
      <AnimatePresence>
        {showCostDetails && (
          <CostDetailsContent
            baseCost={baseCost}
            flagDropFee={flagDropFee}
            maneuverCost={maneuverCost}
            totalTollCost={totalTollCost}
            subtotal={subtotal}
            detectedTolls={detectedTolls}
            totalDistance={totalDistance}
            requiresManeuver={requiresManeuver}
          />
        )}
      </AnimatePresence>
      <div className="flex justify-end space-x-2 mt-4">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onSave && <Button onClick={onSave}>Save</Button>}
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </motion.div>
  )
}

export default FloatingPanelControls