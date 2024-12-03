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
          'py-4 px-6 text-lg font-medium min-w-[200px]',
          position === 'right' && 'right-6 top-24',
          position === 'left' && 'left-6 top-24',
        )}
      >
        <Maximize2 className="w-6 h-6 mr-3" />
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          width: isMaximized ? '100%' : 'auto',
          height: isMaximized ? '100%' : 'auto'
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'fixed bg-white/95 rounded-xl shadow-2xl backdrop-blur-lg transition-all duration-300',
          'min-w-[480px] max-w-3xl w-full mx-4',
          'max-h-[90vh]',
          isMaximized
            ? 'inset-4 !transform-none'
            : cn(
                position === 'right' && 'right-6 top-24',
                position === 'left' && 'left-6 top-24',
              ),
          'z-[1000] border border-primary/20',
          isDragging && 'cursor-grabbing scale-[1.02] shadow-2xl ring-4 ring-primary/20',
          !isMaximized && 'hover:shadow-xl hover:shadow-primary/5',
          'flex flex-col',
          className,
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between p-6 border-b',
            'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5',
            'rounded-t-xl'
          )}
        >
          <div className="flex items-center gap-4">
            {!isMaximized && (
              <div className="drag-handle cursor-grab active:cursor-grabbing p-2 hover:bg-primary/10 rounded-lg transition-colors">
                <GripVertical className="h-5 w-5 text-primary/70" />
              </div>
            )}
            <h3 className="font-heading font-semibold text-lg text-primary/90">
              {title}
            </h3>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
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
              onClick={() => {
                setIsVisible(false)
                toast({
                  title: 'Panel oculto',
                  description: "Haz clic en 'Mostrar Panel' para restaurar",
                  duration: 2000,
                })
              }}
              className="p-3 h-10 w-10 hover:bg-primary/10 rounded-lg transition-colors"
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
              className="flex-1 min-h-0"
            >
              <div
                className={cn(
                  'overflow-y-auto custom-scrollbar h-full',
                  'rounded-b-xl pb-20'
                )}
                style={{ maxHeight: 'calc(90vh - 4rem)' }}
              >
                <div className={cn(
                  'p-8 space-y-8',
                  isMaximized ? 'max-w-4xl mx-auto' : ''
                )}>
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Draggable>
  )
}