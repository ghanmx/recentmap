import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Target, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface Suggestion {
  address: string
  lat: number
  lon: number
  distance: number
}

interface LocationSuggestionsProps {
  suggestions: Suggestion[]
  error: string | null
  isMarking: boolean
  onSuggestionSelect: (suggestion: Suggestion) => void
}

export const LocationSuggestions = ({
  suggestions,
  error,
  isMarking,
  onSuggestionSelect,
}: LocationSuggestionsProps) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-white/95 backdrop-blur-sm 
                    border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100"
        >
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full px-4 py-3 text-left hover:bg-primary/5 flex items-center gap-3 
                       transition-colors group relative"
              onClick={() => onSuggestionSelect(suggestion)}
              disabled={isMarking}
            >
              {isMarking ? (
                <Target className="h-4 w-4 text-primary animate-pulse flex-shrink-0" />
              ) : (
                <MapPin className="h-4 w-4 text-primary/70 group-hover:text-primary flex-shrink-0" />
              )}
              <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-700 group-hover:text-gray-900 line-clamp-2">
                  {suggestion.address}
                </span>
                <span className="text-xs text-gray-500">
                  {suggestion.distance.toFixed(1)}km de Nuevo León
                </span>
              </div>
              {isMarking && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-primary/5 flex items-center justify-center"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
