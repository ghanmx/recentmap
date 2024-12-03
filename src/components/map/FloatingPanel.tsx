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
          'border-2 border-primary/20 hover:border-primary/40',
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
          'fixed bg-white/98 rounded-lg shadow-2xl backdrop-blur-md transition-all duration-300',
          'flex flex-col relative border border-gray-200/50',
          isMaximized
            ? 'inset-4 !transform-none'
            : cn(
                'max-h-[92vh]',
                'w-[95vw] md:w-[520px]',
                position === 'right' && 'right-6 top-24',
                position === 'left' && 'left-6 top-24',
              ),
          'z-[1000]',
          isDragging && 'cursor-grabbing scale-[1.02] shadow-2xl ring-4 ring-primary/20',
          !isMaximized && 'hover:shadow-xl hover:shadow-primary/5',
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
              'h-full rounded-b-lg pb-24',
              'custom-scrollbar overflow-y-auto',
            )}
          >
            <div className="p-8 space-y-8">
              <FloatingPanelContent>{children}</FloatingPanelContent>
            </div>
          </ScrollArea>
        </div>

        {/* Fixed bottom actions area - always visible */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 p-6 bg-white/98 backdrop-blur-lg border-t",
            "transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
            "rounded-b-lg z-10",
            isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              size="default" 
              onClick={() => setIsVisible(false)}
              className="hover:bg-gray-50/80"
            >
              Cerrar
            </Button>
            <Button 
              variant="default" 
              size="default"
              className="bg-primary hover:bg-primary/90 text-white shadow-sm"
            >
              Continuar
            </Button>
          </div>
        </div>
      </motion.div>
    </Draggable>
  )
}