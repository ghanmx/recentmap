import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface LocationSearchInputProps {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  placeholder?: string
  className?: string
  icon?: ReactNode
}

export const LocationSearchInput = ({
  value,
  onChange,
  onFocus,
  placeholder = 'Buscar ubicación...',
  className,
  icon,
}: LocationSearchInputProps) => {
  return (
    <div className={cn("relative", className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={cn(
          "w-full p-2 pl-8 border rounded-md",
          "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary",
          "bg-white/80 backdrop-blur-sm"
        )}
      />
      {icon && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  )
}