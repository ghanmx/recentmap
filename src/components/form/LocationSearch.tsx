import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { searchAddresses } from "@/services/geocodingService";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchProps {
  label: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  currentAddress?: string;
}

export const LocationSearch = ({ 
  label, 
  onLocationSelect, 
  placeholder = "Buscar dirección...",
  currentAddress = ""
}: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (searchQuery.length < 3) {
      toast({
        title: "Búsqueda muy corta",
        description: "Por favor ingrese al menos 3 caracteres",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchAddresses(searchQuery);
      setSuggestions(results);
    } catch (error) {
      toast({
        title: "Error en la búsqueda",
        description: "No se pudieron obtener resultados",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Input
          value={currentAddress || searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-20"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1 h-8"
          onClick={handleSearch}
          disabled={isSearching}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full max-h-60 overflow-auto bg-white border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                onLocationSelect({
                  lat: 0, // These would come from the geocoding service
                  lng: 0,
                  address: suggestion
                });
                setSuggestions([]);
              }}
            >
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};