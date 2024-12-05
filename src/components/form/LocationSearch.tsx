import { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, MapPin, Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import debounce from 'lodash/debounce'
import { searchAddresses, GeocodingResult } from '@/services/geocodingService'
import { calculateDistance } from '@/utils/distanceUtils'
import { COMPANY_LOCATION } from '@/utils/priceCalculator'
import { LocationSuggestions } from './LocationSuggestions'

export interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
  onSelectingLocation?: () => void
  currentAddress?: string
  currentLocation?: { lat: number; lng: number } | null
  placeholder?: string
  type?: 'pickup' | 'drop'
  className?: string
  icon?: React.ReactNode
  requiresInvoice?: boolean
  onInvoiceChange?: (requires: boolean) => void
}

interface Suggestion {
  address: string
  lat: number
  lon: number
  distance: number
}

export const LocationSearch = ({
  onLocationSelect,
  onSelectingLocation,
  currentAddress,
  currentLocation,
  placeholder = 'Buscar ubicación...',
  type = 'pickup',
  className = '',
  icon,
  requiresInvoice = false,
  onInvoiceChange,
}: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(currentAddress || '')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMarking, setIsMarking] = useState(false)
  const { toast } = useToast()

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSuggestions([])
        return
      }

      setIsSearching(true)
      setError(null)

      try {
        const results = await searchAddresses(query, {
          proximity: {
            lat: (currentLocation?.lat || COMPANY_LOCATION.lat).toString(),
            lng: (currentLocation?.lng || COMPANY_LOCATION.lng).toString(),
          }
        })

        const resultsWithDistance = results
          .map((result: GeocodingResult) => {
            const lat = Number(result.lat)
            const lon = Number(result.lon)
            return {
              address: result.display_name,
              lat,
              lon,
              distance: calculateDistance(
                { lat: COMPANY_LOCATION.lat, lng: COMPANY_LOCATION.lng },
                { lat, lng: lon }
              ),
            }
          })
          .sort((a, b) => a.distance - b.distance)

        setSuggestions(resultsWithDistance)
      } catch (err) {
        console.error('Search error:', err)
        setError('Error al buscar ubicaciones')
        toast({
          title: 'Error de búsqueda',
          description: 'No se pudieron obtener las ubicaciones',
          variant: 'destructive',
        })
      } finally {
        setIsSearching(false)
      }
    }, 500),
    [currentLocation, toast],
  )

  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery, handleSearch])

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.address)
    setSuggestions([])
    onLocationSelect({
      lat: suggestion.lat,
      lng: suggestion.lon,
      address: suggestion.address,
    })
  }

  const handleMarkOnMap = () => {
    setIsMarking(true)
    onSelectingLocation?.()
    toast({
      title: `Seleccionar ${type === 'pickup' ? 'punto de recogida' : 'punto de entrega'}`,
      description: 'Haz clic en el mapa para seleccionar la ubicación',
    })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
          )}
          {!isSearching && searchQuery && (
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleMarkOnMap}
          disabled={isMarking}
          className="shrink-0"
        >
          {icon || <MapPin className="h-4 w-4" />}
        </Button>
      </div>

      <LocationSuggestions
        suggestions={suggestions}
        error={error}
        isMarking={isMarking}
        onSuggestionSelect={handleSuggestionSelect}
      />

      {onInvoiceChange && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id={`requires-invoice-${type}`}
            checked={requiresInvoice}
            onChange={(e) => onInvoiceChange(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor={`requires-invoice-${type}`} className="text-sm text-gray-600">
            Requiere factura (IVA)
          </label>
        </div>
      )}
    </div>
  )
}