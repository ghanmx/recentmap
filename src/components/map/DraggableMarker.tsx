import L from 'leaflet'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'

interface DraggableMarkerProps {
  position: L.LatLngExpression
  onDragEnd: (latlng: L.LatLng) => void
  icon?: L.Icon
  label: string
  draggable?: boolean
  isPickup?: boolean
}

export const DraggableMarker = ({
  position,
  onDragEnd,
  icon,
  label,
  draggable = true,
  isPickup = false,
}: DraggableMarkerProps) => {
  const markerRef = useRef<L.Marker>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (markerRef.current) {
      const marker = markerRef.current
      marker.setLatLng(position as L.LatLng)

      // Set z-index based on marker type and hover state
      const baseZIndex = isPickup ? 1000 : 999
      const zIndex = isHovered ? baseZIndex + 1 : baseZIndex
      marker.setZIndexOffset(zIndex)
    }
  }, [position, isHovered, isPickup])

  const eventHandlers = {
    dragend: (e: L.DragEndEvent) => {
      const marker = e.target
      if (marker) {
        onDragEnd(marker.getLatLng())
        toast({
          title: 'Ubicación actualizada',
          description: 'La ubicación ha sido actualizada correctamente',
        })
      }
    },
    mouseover: () => setIsHovered(true),
    mouseout: () => setIsHovered(false),
    dragstart: () => setIsHovered(true),
    click: () => {
      if (markerRef.current) {
        markerRef.current.openPopup()
      }
    },
  }

  return (
    <Marker
      position={position}
      draggable={draggable}
      icon={icon}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <AnimatePresence>
        {(isHovered || !draggable) && (
          <Popup className="custom-popup" closeButton={false}>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="font-semibold p-1"
            >
              {label}
              {draggable && (
                <div className="text-xs text-gray-500 mt-1">
                  Arrastra para ajustar la ubicación
                </div>
              )}
            </motion.div>
          </Popup>
        )}
      </AnimatePresence>
    </Marker>
  )
}