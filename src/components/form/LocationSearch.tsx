import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2 } from "lucide-react";
import { searchAddresses, getAddressFromCoordinates } from "@/services/geocodingService";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";

interface LocationSearchProps {
  label: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  currentAddress?: string;
  currentLocation?: { lat: number; lng: number } | null;
}

export const LocationSearch = ({ 
  label, 
  onLocationSelect, 
  placeholder = "Search address...",
  currentAddress = "",
  currentLocation
}: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{
    address: string;
    lat: number;
    lon: number;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchAddresses(query);
        setSuggestions(results);
      } catch (error) {
        toast({
          title: "Search Error",
          description: "Could not get results",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [toast]
  );

  const handleLocationSelect = async (suggestion: { address: string; lat: number; lon: number }) => {
    const location = {
      lat: suggestion.lat,
      lng: suggestion.lon,
      address: suggestion.address
    };
    onLocationSelect(location);
    setSuggestions([]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Input
          value={currentAddress || searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder={placeholder}
          className="pr-20"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1 h-8"
          onClick={() => debouncedSearch(searchQuery)}
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full max-h-60 overflow-auto bg-white border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 transition-colors"
              onClick={() => handleLocationSelect(suggestion)}
            >
              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm line-clamp-2">{suggestion.address}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};