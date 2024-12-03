import { Button } from '@/components/ui/button'
import { Menu, Maximize2, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface FloatingPanelHeaderControlsProps {
  isCollapsed: boolean
  isMaximized: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
}

export const FloatingPanelHeaderControls = ({
  isCollapsed,
  isMaximized,
  onCollapse,
  onMaximize,
  onClose,
}: FloatingPanelHeaderControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onCollapse}
        className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Menu className="h-5 w-5 text-primary/70" />
        </motion.div>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMaximize}
        className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg"
      >
        <Maximize2 className="h-5 w-5 text-primary/70" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg"
      >
        <X className="h-5 w-5 text-primary/70" />
      </Button>
    </div>
  )
}