import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface LocationSearchInputProps {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  placeholder?: string
  className?: string
  icon?: React.ReactNode
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
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative"
    >
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={cn(
          'pl-10 bg-white/80 backdrop-blur-sm',
          'border-gray-200/80 focus:border-primary/30',
          'shadow-[0_2px_10px_rgba(0,0,0,0.06)]',
          'focus:shadow-[0_2px_15px_rgba(0,0,0,0.1)]',
          'rounded-xl transition-all duration-300',
          className
        )}
      />
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </motion.div>
  )
}