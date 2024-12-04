import { ChevronDown, ChevronUp, GripVertical, Maximize2, Minimize2, X } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingPanelHeaderProps {
  title: string
  isCollapsed: boolean
  isMaximized: boolean
  isDragging?: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  onDetailsToggle?: () => void
}

export const FloatingPanelHeader = ({
  title,
  isCollapsed,
  isMaximized,
  isDragging = false,
  onCollapse,
  onMaximize,
  onClose,
  onDetailsToggle,
}: FloatingPanelHeaderProps) => {
  return (
    <motion.div
      className={cn(
        'flex items-center justify-between p-6 border-b',
        'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5',
        'rounded-t-xl transition-colors duration-300',
        isDragging && 'bg-primary/10'
      )}
      animate={{ scale: isDragging ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-4">
        {!isMaximized && (
          <div className="drag-handle cursor-grab active:cursor-grabbing p-2 hover:bg-primary/10 rounded-lg transition-colors">
            <GripVertical className="h-5 w-5 text-primary/70" />
          </div>
        )}
        <h3 className="font-heading font-semibold text-lg text-primary/90 gradient-text">
          {title}
        </h3>
      </div>
      <div className="flex gap-2">
        {onDetailsToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDetailsToggle}
            className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isCollapsed ? (
                <ChevronUp className="h-5 w-5 text-primary/70" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary/70" />
              )}
            </motion.div>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMaximize}
          className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg transition-colors"
        >
          {isMaximized ? (
            <Minimize2 className="h-5 w-5 text-primary/70" />
          ) : (
            <Maximize2 className="h-5 w-5 text-primary/70" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-primary/70" />
        </Button>
      </div>
    </motion.div>
  )
}