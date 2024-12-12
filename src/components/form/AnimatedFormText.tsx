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
        'inline-block relative',
        'bg-gradient-to-r from-[#2c5ea8] via-gray-500 to-[#2c5ea8]',
        'bg-clip-text text-transparent',
        'animate-shine bg-[length:200%_100%]',
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