import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useTowing } from '@/contexts/TowingContext'
import { EnhancedFormActions } from './EnhancedFormActions'

interface VehicleFormCopyButtonProps {
  form: UseFormReturn<FormData>
  pickupAddress?: string
  dropAddress?: string
  pickupLocation?: { lat: number; lng: number } | null
  dropLocation?: { lat: number; lng: number } | null
  isPending: boolean
}

export const VehicleFormCopyButton = ({
  form,
  pickupAddress,
  dropAddress,
  pickupLocation,
  dropLocation,
  isPending,
}: VehicleFormCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()
  const { tollInfo } = useTowing()

  const handleCopyInfo = () => {
    const formData = form.getValues()
    const info = `
📋 DETALLES DEL SERVICIO DE GRÚA
══════════════════════════════

👤 INFORMACIÓN DEL CLIENTE
------------------------
• Nombre: ${formData.userName}
• Teléfono: ${formData.phone}

🚗 DETALLES DEL VEHÍCULO
------------------------
• Marca: ${formData.vehicleMake}
• Modelo: ${formData.vehicleModel}
• Año: ${formData.vehicleYear}
• Color: ${formData.vehicleColor}

📍 UBICACIONES
------------------------
• Punto de Recogida: ${pickupAddress || 'No especificado'}
  Coordenadas: ${pickupLocation ? `${pickupLocation.lat}, ${pickupLocation.lng}` : 'No especificado'}

• Punto de Entrega: ${dropAddress || 'No especificado'}
  Coordenadas: ${dropLocation ? `${dropLocation.lat}, ${dropLocation.lng}` : 'No especificado'}

🔧 DETALLES DEL SERVICIO
------------------------
• Tipo de Grúa: ${formData.truckType}
• Descripción del Problema:
${formData.issueDescription || 'No especificado'}

💰 INFORMACIÓN DE COSTOS
------------------------
• Peajes en Ruta: ${tollInfo?.totalTollCost ? `$${tollInfo.totalTollCost}` : 'No hay peajes'}
• Cantidad de Peajes: ${tollInfo?.tolls?.length || 0}

Generado automáticamente - ${new Date().toLocaleString()}
    `

    navigator.clipboard.writeText(info).then(() => {
      setIsCopied(true)
      toast({
        title: 'Información Copiada',
        description:
          'Los detalles del servicio han sido copiados al portapapeles',
      })
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <EnhancedFormActions
      onCopy={handleCopyInfo}
      isCopied={isCopied}
      isPending={isPending}
    />
  )
}
