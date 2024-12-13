import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingPanelProps {
  children: ReactNode
  className?: string
  withGrid?: boolean
}

export const FloatingPanel = ({
  children,
  className,
  withGrid = true,
}: FloatingPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-gradient-to-t from-white/95 to-white/80',
        'backdrop-blur-xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)]',
        'border-t border-white/20',
        'rounded-t-[2rem] overflow-hidden',
        'transition-all duration-500 ease-in-out',
        className
      )}
    >
      {withGrid && (
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}