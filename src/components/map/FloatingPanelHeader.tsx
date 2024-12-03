import { cn } from '@/lib/utils'
import { FloatingPanelDragHandle } from './FloatingPanelDragHandle'
import { FloatingPanelHeaderControls } from './FloatingPanelHeaderControls'

export interface FloatingPanelHeaderProps {
  title: string
  isCollapsed: boolean
  isMaximized: boolean
  onCollapse: () => void
  onMaximize: () => void
  onClose: () => void
  onDetailsToggle?: () => void  // Added this optional prop
}

export const FloatingPanelHeader = ({
  title,
  isCollapsed,
  isMaximized,
  onCollapse,
  onMaximize,
  onClose,
  onDetailsToggle,
}: FloatingPanelHeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-6 border-b',
        'bg-gradient-to-r from-primary/5 to-primary/10',
        'rounded-t-xl',
      )}
    >
      <div className="flex items-center gap-4">
        {!isMaximized && <FloatingPanelDragHandle />}
        <h3 className="font-heading font-semibold text-lg text-primary/90">
          {title}
        </h3>
      </div>
      <FloatingPanelHeaderControls
        isCollapsed={isCollapsed}
        isMaximized={isMaximized}
        onCollapse={onCollapse}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </div>
  )
}