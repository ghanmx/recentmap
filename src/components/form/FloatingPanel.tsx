import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ChevronUp,
  ChevronDown,
  X,
  GripVertical,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Draggable from 'react-draggable'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
}

export const FloatingPanel = ({
  children,
  className,
  position = 'right',
  title = 'Panel',
}: FloatingPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const { toast } = useToast()

  const handleDragStart = () => {
    setIsDragging(true)
    toast({
      title: 'Panel móvil',
      description: 'Puedes mover este panel a cualquier parte de la pantalla',
      duration: 2000,
    })
  }

  const handleDragStop = () => {
    setIsDragging(false)
  }

  if (!isVisible) {
    return (
      <Button
        variant="secondary"
        size="lg"
        onClick={() => setIsVisible(true)}
        className={cn(
          'fixed z-[1000] bg-white/95 shadow-lg backdrop-blur-sm',
          'transition-all duration-300 ease-in-out hover:scale-105',
          'border-2 border-primary/20 hover:border-primary/40',
          position === 'right' && 'right-6 top-24',
          position === 'left' && 'left-6 top-24',
        )}
      >
        <Maximize2 className="w-5 h-5 mr-2" />
        Mostrar {title}
      </Button>
    )
  }

  return (
    <Draggable
      handle=".drag-handle"
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
      disabled={isMaximized}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'fixed bg-white/95 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300',
          'min-w-[380px] max-w-2xl w-full mx-4',
          'max-h-[90vh]',
          isMaximized
            ? 'inset-4 !transform-none'
            : cn(
                position === 'right' && 'right-6 top-24',
                position === 'left' && 'left-6 top-24',
              ),
          'z-[1000] border border-primary/10',
          isDragging && 'cursor-grabbing scale-[1.02] shadow-2xl ring-4 ring-primary/20',
          !isMaximized && 'hover:shadow-xl hover:shadow-primary/5',
          className,
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between p-4 border-b',
            'bg-gradient-to-r from-primary/5 to-primary/10',
            'rounded-t-xl',
          )}
        >
          <div className="flex items-center gap-3">
            {!isMaximized && (
              <div className="drag-handle cursor-grab active:cursor-grabbing p-2 hover:bg-primary/10 rounded-lg">
                <GripVertical className="h-5 w-5 text-primary/70" />
              </div>
            )}
            <h3 className="font-semibold text-base text-primary/90">{title}</h3>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 h-9 w-9 hover:bg-primary/10"
            >
              {isCollapsed ? (
                <ChevronUp className="h-5 w-5 text-primary/70" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary/70" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 h-9 w-9 hover:bg-primary/10"
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
              onClick={() => {
                setIsVisible(false)
                toast({
                  title: 'Panel oculto',
                  description: "Haz clic en 'Mostrar Panel' para restaurar",
                  duration: 2000,
                })
              }}
              className="p-2 h-9 w-9 hover:bg-primary/10"
            >
              <X className="h-5 w-5 text-primary/70" />
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'overflow-y-auto',
                isMaximized ? 'p-8' : 'p-6',
                'custom-scrollbar'
              )}
              style={{ maxHeight: 'calc(90vh - 4rem)' }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Draggable>
  )
}