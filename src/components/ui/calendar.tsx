import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar as CalendarBase, CalendarProps } from 'react-calendar'
import { cn } from '@/lib/utils'

interface CustomCalendarProps extends CalendarProps {
  mode?: 'single' | 'range'
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
}

const Calendar = React.forwardRef<HTMLDivElement, CustomCalendarProps>(
  ({ className, mode, selected, onSelect, ...props }, ref) => {
    return (
      <CalendarBase
        ref={ref as any}
        className={cn('p-3 bg-white rounded-lg shadow', className)}
        nextLabel={<ChevronRight className="h-4 w-4" />}
        next2Label={null}
        prevLabel={<ChevronLeft className="h-4 w-4" />}
        prev2Label={null}
        view="month"
        value={selected}
        onChange={onSelect as any}
        {...props}
      />
    )
  }
)

Calendar.displayName = 'Calendar'

export { Calendar }