import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { LocationSearchInput } from "./LocationSearchInput";
import { LocationSuggestions } from "./LocationSuggestions";
import { searchAddresses } from "@/services/geocodingService";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface LocationSearchProps {
  label: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  currentAddress?: string;
  currentLocation?: { lat: number; lng: number } | null;
  icon?: React.ReactNode;
  type?: 'pickup' | 'drop';
  showCostBreakdown?: boolean;
}

export const LocationSearch = ({ 
  label, 
  onLocationSelect, 
  placeholder = "Search address...",
  currentAddress = "",
  currentLocation,
  icon,
  type = 'pickup',
  showCostBreakdown = false
}: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(currentAddress || "");
  const [suggestions, setSuggestions] = useState<Array<{
    address: string;
    lat: number;
    lon: number;
    distance: number;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMarking, setIsMarking] = useState(false);
  const { toast } = useToast();

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        setError(null);
        return;
      }

      setIsSearching(true);
      setError(null);
      
      try {
        const results = await searchAddresses(query);
        setSuggestions(results);
        
        if (results.length === 0) {
          setError("No se encontraron direcciones. Intente con una búsqueda diferente.");
          toast({
            title: "Sin resultados",
            description: "Intente con términos de búsqueda diferentes",
            variant: "destructive",
            duration: 3000
          });
        }
      } catch (error) {
        setError("Error al buscar direcciones. Por favor, inténtelo de nuevo.");
        toast({
          title: "Error en la búsqueda",
          description: "No se pudieron obtener sugerencias de direcciones",
          variant: "destructive",
          duration: 5000
        });
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [toast]
  );

  const handleSuggestionSelect = async (suggestion: { address: string; lat: number; lon: number }) => {
    setIsMarking(true);
    try {
      const location = {
        lat: suggestion.lat,
        lng: suggestion.lon,
        address: suggestion.address
      };

      setSearchQuery(suggestion.address);
      setSuggestions([]);
      setError(null);
      
      onLocationSelect(location);
      
      toast({
        title: type === 'pickup' ? "Punto de recogida seleccionado" : "Punto de entrega seleccionado",
        description: suggestion.address,
        duration: 5000,
        className: type === 'pickup' ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al seleccionar la ubicación",
        variant: "destructive",
        duration: 7000
      });
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2 relative"
    >
      <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
        <LocationSearchInput
          searchQuery={searchQuery}
          isSearching={isSearching}
          error={error}
          onSearchChange={(value) => {
            setSearchQuery(value);
            if (value.length >= 3) {
              debouncedSearch(value);
            } else {
              setSuggestions([]);
              setError(null);
            }
          }}
          onSearchClick={() => debouncedSearch(searchQuery)}
          placeholder={placeholder}
          icon={icon}
        />
        
        {isSearching && (
          <div className="absolute right-3 top-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <LocationSuggestions
        suggestions={suggestions}
        error={error}
        isMarking={isMarking}
        onSuggestionSelect={handleSuggestionSelect}
        type={type}
      />
    </motion.div>
  );
};