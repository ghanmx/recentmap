import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position as L.LatLng)
    }
  }, [position])

  const handleDragEnd = (e: L.DragEndEvent) => {
    const marker = e.target
    onDragEnd(marker.getLatLng())
  }

  useEffect(() => {
    if (markerRef.current) {
      // Set z-index based on marker type and hover state
      const zIndex = isPickup ? 1000 : 999
      const hoverZIndex = zIndex + 1
      markerRef.current.setZIndexOffset(isHovered ? hoverZIndex : zIndex)
    }
  }, [isHovered, isPickup])

  return (
    <Marker
      position={position}
      draggable={draggable}
      icon={icon}
      eventHandlers={{
        dragend: handleDragEnd,
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false),
        dragstart: () => setIsHovered(true),
      }}
      ref={markerRef}
    >
      <Popup className="custom-popup">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold p-1"
        >
          {label}
        </motion.div>
      </Popup>
    </Marker>
  )
}