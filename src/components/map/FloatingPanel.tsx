import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Maximize2, Menu, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import Draggable from 'react-draggable'
import { FloatingPanelProps } from './types/floating-panel'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FloatingPanelContent } from './FloatingPanelContent'
import { FloatingPanelControls } from './FloatingPanelControls'

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
        size="sm"
        onClick={() => setIsVisible(true)}
        className={cn(
          'fixed z-[1000] bg-white/95 shadow-lg backdrop-blur-sm',
          'transition-all duration-300 ease-in-out hover:scale-105',
          position === 'right' && 'right-4 top-20',
          position === 'left' && 'left-4 top-20',
        )}
      >
        <Maximize2 className="w-4 h-4 mr-2" />
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
        className={cn(
          'fixed bg-white/95 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300',
          'flex flex-col',
          isMaximized
            ? 'inset-4 !transform-none'
            : cn(
                'max-h-[90vh]',
                'w-[95vw] md:w-[450px]',
                position === 'right' && 'right-6 top-24',
                position === 'left' && 'left-6 top-24',
              ),
          'z-[1000]',
          isDragging && 'cursor-grabbing shadow-2xl scale-[1.02]',
          !isMaximized && 'hover:shadow-lg hover:shadow-primary/5',
          className,
        )}
      >
        <FloatingPanelControls
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
          title={title}
        />

        <div
          className={cn(
            'transition-all duration-300 flex-1 min-h-0',
            isCollapsed ? 'h-0' : 'h-full',
            !isCollapsed && 'animate-in fade-in-50',
          )}
        >
          <ScrollArea
            className={cn(
              'h-full rounded-b-lg pb-16', // Added padding at bottom for better button access
              'custom-scrollbar overflow-y-auto',
            )}
          >
            <div className="p-4 space-y-4">
              <FloatingPanelContent>{children}</FloatingPanelContent>
            </div>
          </ScrollArea>
        </div>

        {/* Fixed bottom actions area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t rounded-b-lg shadow-lg">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
              Cerrar
            </Button>
            <Button variant="default" size="sm">
              Continuar
            </Button>
          </div>
        </div>
      </motion.div>
    </Draggable>
  )
}