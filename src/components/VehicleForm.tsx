import { useState } from 'react'
import { motion } from 'framer-motion'
import { Accordion } from '@/components/ui/accordion'
import { VehicleFormFields } from './form/VehicleFormFields'
import { VehicleFormHeader } from './form/VehicleFormHeader'
import { VehicleFormActions } from './form/VehicleFormActions'
import { LocationSelector } from './form/LocationSelector'
import { ServiceRequirements } from './form/ServiceRequirements'
import { Location } from '@/types/location'
import { useForm } from 'react-hook-form'
import { FormData } from '@/types/form'

interface VehicleFormProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
}

export const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: VehicleFormProps) => {
  const form = useForm<FormData>()
  const [formData, setFormData] = useState({
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    truckType: 'A',
    requiresManeuver: false,
    issueDescription: '',
    pickupLocation: null,
    dropoffLocation: null,
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10"
    >
      <div className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
        border border-white/20 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all duration-500">
        <VehicleFormHeader />
        
        <Accordion
          type="single"
          collapsible
          className="space-y-4 mt-6"
        >
          <motion.div
            className="space-y-6 backdrop-blur-sm bg-gradient-to-br from-white/40 via-white/30 to-blue-50/30 
              p-6 rounded-xl border border-white/40 shadow-inner"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <VehicleFormFields 
              formData={formData}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div
            className="space-y-6 backdrop-blur-sm bg-gradient-to-br from-white/40 via-white/30 to-blue-50/30 
              p-6 rounded-xl border border-white/40 shadow-inner"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <LocationSelector 
              form={form}
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              pickupAddress={pickupAddress}
              dropAddress={dropAddress}
              onPickupSelect={onPickupSelect}
              onDropSelect={onDropSelect}
              onSelectingPickup={onSelectingPickup}
              onSelectingDrop={onSelectingDrop}
            />
          </motion.div>

          <motion.div
            className="space-y-6 backdrop-blur-sm bg-gradient-to-br from-white/40 via-white/30 to-blue-50/30 
              p-6 rounded-xl border border-white/40 shadow-inner"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <ServiceRequirements 
              formData={formData}
              onChange={handleChange}
            />
          </motion.div>
        </Accordion>

        <VehicleFormActions formData={formData} />
      </div>
    </motion.div>
  )
}