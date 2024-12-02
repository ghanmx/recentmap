import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react'

interface FloatingPanelHeaderProps {
  title: string
  isCollapsed: boolean
  isMaximized: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
}

export const FloatingPanelHeader = ({
  title,
  isCollapsed,
  isMaximized,
  onCollapse,
  onMaximize,
  onClose,
}: FloatingPanelHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!isMaximized && (
          <motion.div
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.8 }}
            className="drag-handle cursor-grab active:cursor-grabbing p-1.5 hover:bg-primary/10 rounded-md"
          >
            <GripVertical className="h-4 w-4 text-primary/50" />
          </motion.div>
        )}
        <h3 className="font-heading font-semibold text-primary/60 text-sm truncate">
          {title}
        </h3>
      </div>

      <div className="flex gap-1">
        {[
          {
            onClick: onCollapse,
            icon: isCollapsed ? (
              <ChevronUp className="h-4 w-4 text-primary/70" />
            ) : (
              <ChevronDown className="h-4 w-4 text-primary/70" />
            ),
          },
          {
            onClick: onMaximize,
            icon: isMaximized ? (
              <Minimize2 className="h-4 w-4 text-primary/70" />
            ) : (
              <Maximize2 className="h-4 w-4 text-primary/70" />
            ),
          },
          {
            onClick: onClose,
            icon: <X className="h-4 w-4 text-primary/70" />,
          },
        ].map((control, index) => (
          <motion.div key={index} whileHover={{ scale: 1.0 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={control.onClick}
              className="p-1.5 h-8 w-8 hover:bg-primary/10 no-drag rounded-full"
            >
              {control.icon}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
