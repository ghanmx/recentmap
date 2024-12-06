import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NotificationBadgeProps {
  count?: number
  className?: string
}

export const NotificationBadge = ({ count, className }: NotificationBadgeProps) => {
  return (
    <div className={cn("relative inline-flex", className)}>
      <Bell className="w-5 h-5 text-primary" />
      {count && count > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">{count}</span>
        </div>
      )}
    </div>
  )
}