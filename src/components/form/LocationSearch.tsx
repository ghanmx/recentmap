import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { LocationSearchInput } from "./LocationSearchInput";
import { LocationSuggestions } from "./LocationSuggestions";
import { searchAddresses } from "@/services/geocodingService";

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
  placeholder = "Search address...",
  currentAddress = "",
  currentLocation,
  icon,
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
        }
      } catch (error) {
        setError("Error al buscar direcciones. Por favor, inténtelo de nuevo.");
        toast({
          title: "Error en la búsqueda",
          description: "No se pudieron obtener sugerencias de direcciones",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
    }, 500),
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
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al seleccionar la ubicación",
        variant: "destructive"
      });
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="space-y-2">
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
      
      <LocationSuggestions
        suggestions={suggestions}
        error={error}
        isMarking={isMarking}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </div>
  );
};