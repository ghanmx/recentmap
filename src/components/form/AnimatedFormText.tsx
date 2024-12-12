import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedFormText = ({ children, className }: AnimatedTextProps) => {
  return (
    <motion.span
      className={cn(
        'inline-block bg-gradient-to-r from-[#2c5ea8] to-primary bg-clip-text text-transparent',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
    >
      {children}
    </motion.span>
  )
}