import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SharedLayoutProps {
  children: ReactNode
  className?: string
  withGrid?: boolean
}

export const SharedLayout = ({
  children,
  className,
  withGrid = true,
}: SharedLayoutProps) => {
  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
        className,
      )}
    >
      {withGrid && (
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
