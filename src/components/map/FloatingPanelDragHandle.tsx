import { Menu } from 'lucide-react'

export const FloatingPanelDragHandle = () => {
  return (
    <div className="drag-handle cursor-grab active:cursor-grabbing p-2 hover:bg-primary/10 rounded-lg">
      <Menu className="h-5 w-5 text-primary/70" />
    </div>
  )
}