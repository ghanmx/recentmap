import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-8 glass-card max-w-md mx-auto text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
          <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10 mx-auto" />
        </div>

        <Separator className="my-6 bg-blue-200/20" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent font-heading"
        >
          Cargando
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-medium text-muted-foreground"
        >
          Por favor espera un momento...
        </motion.p>
      </Card>
    </motion.div>
  </div>
)
