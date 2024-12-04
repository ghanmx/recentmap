import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Maximize2 } from 'lucide-react'
import Draggable from 'react-draggable'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingPanelHeader } from './FloatingPanelHeader'
import { FloatingPanelContent } from './FloatingPanelContent'

interface FloatingPanelProps {
  children: ReactNode
  className?: string
  position?: 'left' | 'right'
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
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
            position === 'left' && 'left-6 top-24'
          )}
        >
          <Maximize2 className="w-6 h-6 mr-3" />
          Mostrar {title}
        </Button>
      </motion.div>
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
          height: isMaximized ? '100%' : 'auto',
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
                position === 'left' && 'left-6 top-24'
              ),
          'z-[1000] border border-primary/20',
          isDragging &&
            'cursor-grabbing scale-[1.02] shadow-2xl ring-4 ring-primary/20',
          !isMaximized && 'hover:shadow-xl hover:shadow-primary/5',
          'flex flex-col',
          className
        )}
      >
        <FloatingPanelHeader
          title={title}
          isCollapsed={isCollapsed}
          isMaximized={isMaximized}
          isDragging={isDragging}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          onMaximize={() => setIsMaximized(!isMaximized)}
          onClose={() => {
            setIsVisible(false)
            toast({
              title: 'Panel oculto',
              description: "Haz clic en 'Mostrar Panel' para restaurar",
              duration: 2000,
            })
          }}
        />

        <AnimatePresence>
          {!isCollapsed && (
            <FloatingPanelContent isMaximized={isMaximized}>
              {children}
            </FloatingPanelContent>
          )}
        </AnimatePresence>
      </motion.div>
    </Draggable>
  )
}