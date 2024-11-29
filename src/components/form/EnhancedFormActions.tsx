import { Button } from '@/components/ui/button'
import { CreditCard, Copy, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface EnhancedFormActionsProps {
  onCopy: () => void
  isCopied: boolean
  isPending: boolean
}

export const EnhancedFormActions = ({
  onCopy,
  isCopied,
  isPending,
}: EnhancedFormActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="space-y-4"
    >
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={onCopy}
          className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100 transition-all duration-300 group relative overflow-hidden"
        >
          <span className="flex items-center justify-center gap-2">
            {isCopied ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
            )}
            {isCopied ? '¡Copiado!' : 'Copiar Información'}
          </span>
          <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <CreditCard className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Continuar al Pago
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
