import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Maximize2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import Draggable from 'react-draggable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FloatingPanelContent } from './FloatingPanelContent'
import { FloatingPanelHeader } from './FloatingPanelHeader'
import { FloatingPanelProps } from './types/floating-panel'

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
          'min-w-[200px] py-4 px-6 text-lg font-medium',
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
          height: isMaximized ? '100%' : 'auto',
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'fixed bg-white/95 rounded-xl shadow-2xl backdrop-blur-lg transition-all duration-300',
          'min-w-[420px] max-w-3xl w-full mx-4',
          'max-h-[90vh]',
          isMaximized
            ? 'inset-4 !transform-none'
            : cn(
                position === 'right' && 'right-6 top-24',
                position === 'left' && 'left-6 top-24',
              ),
          'z-[1000] border border-primary/20',
          isDragging &&
            'cursor-grabbing scale-[1.02] shadow-2xl ring-4 ring-primary/20',
          !isMaximized && 'hover:shadow-xl hover:shadow-primary/5',
          'flex flex-col',
          className,
        )}
      >
        <FloatingPanelHeader
          title={title}
          isCollapsed={isCollapsed}
          isMaximized={isMaximized}
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
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-h-0"
            >
              <ScrollArea
                className={cn(
                  'h-full rounded-b-xl pb-20',
                  'custom-scrollbar overflow-y-auto',
                )}
              >
                <div
                  className={cn(
                    'p-8 space-y-8',
                    isMaximized ? 'max-w-4xl mx-auto' : '',
                  )}
                >
                  <FloatingPanelContent>{children}</FloatingPanelContent>
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Draggable>
  )
}

export default FloatingPanel