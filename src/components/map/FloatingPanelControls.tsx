import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { FloatingPanelControlsProps } from './types/floating-panel'

export const FloatingPanelControls = ({
  isCollapsed = false,
  isMaximized = false,
  isDragging = false,
  onCollapse = () => {},
  onMaximize = () => {},
  onClose = () => {},
  title,
  className,
  onSave,
  onCancel,
  onDetailsToggle,
  children,
}: FloatingPanelControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('p-4 border-t bg-white shadow rounded-lg', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {title}
        </div>
        <div className="flex items-center space-x-2">
          {onDetailsToggle && (
            <Button variant="ghost" size="sm" onClick={onDetailsToggle}>
              Details
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onCollapse}>
            {isCollapsed ? 'Expand' : 'Collapse'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onMaximize}>
            {isMaximized ? 'Restore' : 'Maximize'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      {children}
      {(onSave || onCancel) && (
        <div className="flex justify-end space-x-2 mt-4">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onSave && (
            <Button onClick={onSave}>Save</Button>
          )}
        </div>
      )}
    </motion.div>
  )
}