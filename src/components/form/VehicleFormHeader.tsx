import { motion } from 'framer-motion'

export const VehicleFormHeader = () => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Información del Servicio
      </h2>
      <p className="text-gray-600">
        Complete los detalles del vehículo y servicio requerido
      </p>
    </motion.div>
  )
}
