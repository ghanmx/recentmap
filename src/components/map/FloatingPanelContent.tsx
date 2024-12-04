import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingPanelContentProps {
  children: ReactNode
  isMaximized: boolean
}

export const FloatingPanelContent = ({
  children,
  isMaximized,
}: FloatingPanelContentProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 min-h-0"
    >
      <div
        className={cn(
          'overflow-y-auto custom-scrollbar h-full',
          'rounded-b-xl pb-20'
        )}
        style={{ maxHeight: 'calc(90vh - 4rem)' }}
      >
        <div
          className={cn('p-8 space-y-8', isMaximized ? 'max-w-4xl mx-auto' : '')}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}