import { Input } from '@/components/ui/input'
import { Search, Loader2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface LocationSearchInputProps {
  searchQuery: string
  isSearching: boolean
  error: string | null
  suggestions: Array<{ formattedAddress: string }>
  onSearchChange: (value: string) => void
  onSearchClick: () => void
  handleSuggestionSelect: (suggestion: { formattedAddress: string }) => void
  placeholder?: string
  icon?: React.ReactNode
}

export const LocationSearchInput = ({
  searchQuery,
  isSearching,
  error,
  suggestions,
  onSearchChange,
  onSearchClick,
  handleSuggestionSelect,
  placeholder = 'Buscar dirección...',
  icon = <MapPin className="h-4 w-4 text-primary" />,
}: LocationSearchInputProps) => {
  const suggestionsLength = suggestions ? suggestions.length : 0

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-primary/70">
          {icon}
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className={`
            pl-10 pr-10 h-12 bg-white/95 backdrop-blur-sm 
            border-gray-200 hover:border-primary/50 focus:border-primary
            focus:ring-2 focus:ring-primary/20 
            placeholder:text-gray-400 transition-all duration-200
            ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}
            ${isSearching ? 'pr-16' : ''}
          `}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSearchClick()
            }
          }}
        />
        <AnimatePresence>
          {isSearching ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </motion.div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 hover:bg-primary/10 transition-colors"
              onClick={onSearchClick}
              disabled={isSearching || searchQuery.length < 3}
            >
              <Search className="h-4 w-4 text-primary" />
            </Button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-sm text-red-500 mt-1 ml-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {suggestionsLength > 1 && (
        <div className="space-y-2 mt-4">
          <h4>Did you mean:</h4>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="block text-left p-2 hover:bg-gray-100 rounded"
            >
              {suggestion.formattedAddress}
            </button>
          ))}
        </div>
      )}
      {suggestionsLength === 0 &&
        searchQuery.length >= 3 &&
        !isSearching &&
        !error && (
          <div className="mt-4 text-gray-500">No suggestions found</div>
        )}
    </motion.div>
  )
}
