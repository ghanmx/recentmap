import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Target, Loader2, Navigation } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Suggestion {
  address: string;
  lat: number;
  lon: number;
  distance: number;
}

interface LocationSuggestionsProps {
  suggestions: Suggestion[];
  error: string | null;
  isMarking: boolean;
  onSuggestionSelect: (suggestion: Suggestion) => void;
  type?: 'pickup' | 'drop';
}

export const LocationSuggestions = ({
  suggestions,
  error,
  isMarking,
  onSuggestionSelect,
  type = 'pickup'
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
          className="absolute z-50 w-full mt-1"
        >
          <Card className="p-2 space-y-1 bg-white/95 backdrop-blur-sm shadow-lg border-blue-100/50">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full p-3 text-left hover:bg-primary/5 rounded-lg flex items-center gap-3 
                         transition-all duration-300 group relative"
                onClick={() => onSuggestionSelect(suggestion)}
                disabled={isMarking}
              >
                {isMarking ? (
                  <Target className="h-4 w-4 text-primary animate-pulse flex-shrink-0" />
                ) : type === 'pickup' ? (
                  <MapPin className="h-4 w-4 text-green-500 group-hover:text-green-600 flex-shrink-0" />
                ) : (
                  <Navigation className="h-4 w-4 text-blue-500 group-hover:text-blue-600 flex-shrink-0" />
                )}

                <div className="flex flex-col flex-1">
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 line-clamp-2">
                    {suggestion.address}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.distance.toFixed(1)}km de Nuevo León
                    </Badge>
                  </div>
                </div>

                {isMarking && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-primary/5 flex items-center justify-center rounded-lg"
                  >
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};