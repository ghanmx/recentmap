import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface MapLoadingOverlayProps {
  isVisible: boolean
}

export const MapLoadingOverlay = ({ isVisible }: MapLoadingOverlayProps) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-white/90 p-6 rounded-lg shadow-lg">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="mt-4 text-primary/80 font-medium">Cargando...</p>
      </div>
    </motion.div>
  )
}
