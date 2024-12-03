import React, { forwardRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar as CalendarBase } from 'react-calendar'

const Calendar = forwardRef((props, ref) => {
  return (
    <CalendarBase
      ref={ref}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
      }}
      {...props}
    />
  )
})
Calendar.displayName = "Calendar"

export { Calendar }
