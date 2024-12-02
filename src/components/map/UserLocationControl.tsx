import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserLocationControlProps {
  visible: boolean
  onToggle: () => void
}

export const UserLocationControl = ({ visible, onToggle }: UserLocationControlProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className={cn(
        'h-10 w-10 rounded-full',
        visible && 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
      )}
      title={visible ? 'Hide your location' : 'Show your location'}
    >
      <MapPin className="h-4 w-4" />
    </Button>
  )
}