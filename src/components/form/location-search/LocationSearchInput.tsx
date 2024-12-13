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
  searchQuery?: string
  isSearching?: boolean
  error?: string | null
  onSearchClick?: () => Promise<void> | undefined
  onSearchChange?: (value: string) => void
}

export const LocationSearchInput = ({
  value,
  onChange,
  onFocus,
  placeholder = 'Buscar ubicación...',
  className,
  icon,
  searchQuery,
  isSearching,
  error,
  onSearchClick,
  onSearchChange,
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
          "w-full p-2 border rounded-md",
          {
            "border-red-500": error,
            "border-gray-300": !error,
          }
        )}
      />
      {icon && <div className="absolute left-2 top-1/2 transform -translate-y-1/2">{icon}</div>}
      {isSearching && <div className="absolute right-2 top-1/2 transform -translate-y-1/2">Loading...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  )
}
