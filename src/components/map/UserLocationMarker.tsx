import { useState, useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useToast } from '@/hooks/use-toast'
import { getAddressFromCoordinates } from '@/services/geocodingService'
import { MapPin } from 'lucide-react'

interface UserLocationMarkerProps {
  visible: boolean
}

const createUserIcon = () => {
  return L.divIcon({
    className: 'relative',
    html: `
      <div class="relative">
        <div class="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-25 animate-ping"></div>
        <div class="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full"></div>
        <div class="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [20, 20],
  })
}

export const UserLocationMarker = ({ visible }: UserLocationMarkerProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [address, setAddress] = useState<string>('')
  const map = useMap()
  const { toast } = useToast()

  useEffect(() => {
    if (!visible) return

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const newPos: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ]
        setPosition(newPos)

        try {
          const addr = await getAddressFromCoordinates(newPos[0], newPos[1])
          setAddress(addr)
        } catch (error) {
          console.error('Error fetching address:', error)
        }
      },
      (error) => {
        toast({
          title: 'Location Error',
          description:
            'Unable to get your location. Please check your browser permissions.',
          variant: 'destructive',
        })
        console.error('Geolocation error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [visible, toast])

  if (!visible || !position) return null

  return (
    <Marker position={position} icon={createUserIcon()}>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold mb-1">Your Location</h3>
          <p className="text-sm text-gray-600">{address}</p>
          <div className="text-xs text-gray-500 mt-1">
            {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
