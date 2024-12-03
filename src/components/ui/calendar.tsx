import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar as CalendarBase, CalendarProps } from 'react-calendar'
import { cn } from '@/lib/utils'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface CustomCalendarProps extends Omit<CalendarProps, 'value' | 'onChange'> {
  mode?: 'single' | 'range'
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | Date[] | undefined) => void
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
        value={selected as Value}
        onChange={onSelect as (value: Value) => void}
        {...props}
      />
    )
  }
)

Calendar.displayName = 'Calendar'

export { Calendar }