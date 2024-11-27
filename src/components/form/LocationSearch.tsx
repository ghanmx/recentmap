import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { LocationSearchInput } from "./LocationSearchInput";
import { LocationSuggestions } from "./LocationSuggestions";
import { searchAddresses } from "@/services/geocodingService";
import { calculateDistance } from "@/utils/distanceUtils";
import { COMPANY_LOCATION } from "@/services/routeService";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface LocationSearchProps {
  label: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  currentAddress?: string;
  currentLocation?: { lat: number; lng: number } | null;
  icon?: React.ReactNode;
  type?: 'pickup' | 'drop';
}

export const LocationSearch = ({ 
  label, 
  onLocationSelect, 
  placeholder = "Buscar dirección...",
  currentAddress = "",
  currentLocation,
  icon = <MapPin className="h-4 w-4 text-primary" />,
  type = 'pickup'
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

  useEffect(() => {
    if (currentAddress && currentAddress !== searchQuery) {
      setSearchQuery(currentAddress);
    }
  }, [currentAddress]);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        setError(null);
        return;
      }

      setIsSearching(true);
      setError(null);
      
      try {
        const results = await searchAddresses(query, {
          fuzzyMatch: true,
          limit: 5,
          countryCode: 'MX',
          proximity: COMPANY_LOCATION
        });
        
        const resultsWithDistance = results
          .map(result => ({
            ...result,
            distance: calculateDistance(
              { lat: COMPANY_LOCATION.lat, lng: COMPANY_LOCATION.lng },
              { lat: result.lat, lng: result.lon }
            )
          }))
          .sort((a, b) => {
            const relevanceA = a.address.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
            const relevanceB = b.address.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
            return relevanceA !== relevanceB ? relevanceA - relevanceB : a.distance - b.distance;
          });

        setSuggestions(resultsWithDistance);
        
        if (results.length === 0) {
          setError("No se encontraron direcciones. Intente con una búsqueda diferente.");
        }
      } catch (error) {
        setError("Error al buscar direcciones. Por favor, inténtelo de nuevo.");
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
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
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al seleccionar la ubicación",
        variant: "destructive"
      });
    } finally {
      setIsMarking(false);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.length >= 2) {
      debouncedSearch(searchQuery);
    }
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <LocationSearchInput
          searchQuery={searchQuery}
          isSearching={isSearching}
          error={error}
          onSearchChange={(value) => {
            setSearchQuery(value);
            if (value.length >= 2) {
              debouncedSearch(value);
            } else {
              setSuggestions([]);
              setError(null);
            }
          }}
          onSearchClick={handleSearchClick}
          placeholder={placeholder}
          icon={type === 'pickup' ? 
            <MapPin className="h-4 w-4 text-green-500" /> : 
            <Navigation className="h-4 w-4 text-red-500" />
          }
        />
      </div>
      
      <LocationSuggestions
        suggestions={suggestions}
        error={error}
        isMarking={isMarking}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </motion.div>
  );
};