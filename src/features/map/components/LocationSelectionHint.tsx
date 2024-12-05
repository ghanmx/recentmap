import { motion } from 'framer-motion'

interface LocationSelectionHintProps {
  isSelectingPickup: boolean
  isSelectingDrop: boolean
}

export const LocationSelectionHint = ({
  isSelectingPickup,
  isSelectingDrop,
}: LocationSelectionHintProps) => {
  if (!isSelectingPickup && !isSelectingDrop) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/5 via-transparent to-transparent"
    >
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-primary/10">
        <p className="text-sm text-primary/80 font-medium">
          {isSelectingPickup
            ? 'Haz clic en el mapa para seleccionar el punto de recogida'
            : 'Haz clic en el mapa para seleccionar el punto de entrega'}
        </p>
      </div>
    </motion.div>
  )
}
