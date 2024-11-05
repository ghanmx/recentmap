import { useState, useCallback, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2, AlertCircle } from "lucide-react";
import { searchAddresses } from "@/services/geocodingService";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationSearchProps {
  label: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  currentAddress?: string;
  currentLocation?: { lat: number; lng: number } | null;
  icon?: ReactNode;
}

export const LocationSearch = ({ 
  label, 
  onLocationSelect, 
  placeholder = "Search address...",
  currentAddress = "",
  currentLocation,
  icon
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

  // Update search query when currentAddress changes
  useEffect(() => {
    if (currentAddress && currentAddress !== searchQuery) {
      setSearchQuery(currentAddress);
    }
  }, [currentAddress]);

  const handleLocationSelect = (suggestion: { address: string; lat: number; lon: number; distance: number }) => {
    const location = {
      lat: suggestion.lat,
      lng: suggestion.lon,
      address: suggestion.address
    };
    onLocationSelect(location);
    setSuggestions([]);
    setSearchQuery(suggestion.address);
    setError(null);
    
    toast({
      title: "Ubicación seleccionada",
      description: `${suggestion.address} (${suggestion.distance.toFixed(1)}km de Nuevo León)`,
    });
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <Input
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              if (value.length >= 3) {
                debouncedSearch(value);
              } else {
                setSuggestions([]);
                setError(null);
              }
            }}
            placeholder={placeholder}
            className={`${icon ? 'pl-10' : ''} pr-10 bg-white/95 backdrop-blur-sm border-gray-200 
                       focus:border-primary/50 focus:ring-2 focus:ring-primary/20 
                       placeholder:text-gray-400 ${error ? 'border-red-300' : ''}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 hover:bg-primary/10"
            onClick={() => debouncedSearch(searchQuery)}
            disabled={isSearching || searchQuery.length < 3}
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <Search className="h-4 w-4 text-primary" />
            )}
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-white/95 backdrop-blur-sm 
                        border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 text-left hover:bg-primary/5 flex items-center gap-3 
                         transition-colors group"
                onClick={() => handleLocationSelect(suggestion)}
              >
                <MapPin className="h-4 w-4 text-primary/70 group-hover:text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 line-clamp-2">
                    {suggestion.address}
                  </span>
                  <span className="text-xs text-gray-500">
                    {suggestion.distance.toFixed(1)}km de Nuevo León
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};