import { useState, useCallback } from 'react'
import { LocationSearchInput } from './LocationSearchInput'
import { LocationSuggestions } from './LocationSuggestions'
import { InvoiceCheckbox } from './InvoiceCheckbox'
import { LocationSearchProps, Suggestion } from '@/types/location-search'
import { searchAddresses } from '@/services/geocodingService'
import { calculateDistance } from '@/utils/distanceUtils'
import { COMPANY_LOCATION } from '@/utils/priceCalculator'
import { useToast } from '@/hooks/use-toast'
import debounce from 'lodash/debounce'
import { motion, AnimatePresence } from 'framer-motion'

export const LocationSearchContainer = ({
  onLocationSelect,
  onSelectingLocation,
  currentAddress,
  currentLocation,
  placeholder,
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
        console.log('Searching for:', query)
        const results = await searchAddresses(query, {
          proximity: {
            lat: currentLocation?.lat?.toString() || COMPANY_LOCATION.lat.toString(),
            lng: currentLocation?.lng?.toString() || COMPANY_LOCATION.lng.toString(),
          },
        })

        console.log('Search results:', results)

        const resultsWithDistance = results
          .map((result) => ({
            address: result.display_name,
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
            distance: calculateDistance(
              { lat: COMPANY_LOCATION.lat, lng: COMPANY_LOCATION.lng },
              { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
            ),
          }))
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
    [currentLocation, toast]
  )

  const handleSuggestionSelect = async (suggestion: Suggestion) => {
    setIsMarking(true)
    try {
      setSearchQuery(suggestion.address)
      setSuggestions([])
      onLocationSelect({
        lat: suggestion.lat,
        lng: suggestion.lon,
        address: suggestion.address,
      })
      toast({
        title: `Ubicación ${type === 'pickup' ? 'de recogida' : 'de entrega'} seleccionada`,
        description: suggestion.address,
        className: type === 'pickup' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200',
      })
    } catch (error) {
      console.error('Error selecting location:', error)
      toast({
        title: 'Error',
        description: 'No se pudo seleccionar la ubicación',
        variant: 'destructive',
      })
    } finally {
      setIsMarking(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-2 ${className}`}
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LocationSearchInput
            searchQuery={searchQuery}
            isSearching={isSearching}
            error={error}
            onSearchChange={setSearchQuery}
            onSearchClick={() => handleSearch(searchQuery)}
            placeholder={placeholder}
            icon={icon}
          />
        </div>
      </div>

      <AnimatePresence>
        <LocationSuggestions
          suggestions={suggestions}
          error={error}
          isMarking={isMarking}
          onSuggestionSelect={handleSuggestionSelect}
        />
      </AnimatePresence>

      {onInvoiceChange && (
        <InvoiceCheckbox
          type={type}
          requiresInvoice={requiresInvoice}
          onInvoiceChange={onInvoiceChange}
        />
      )}
    </motion.div>
  )
}