import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";

interface ReservationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  sortDirection: 'asc' | 'desc';
  onSortChange: () => void;
}

export const ReservationFilters = ({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateSelect,
  sortDirection,
  onSortChange
}: ReservationFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtrar Reservas</span>
        </div>
        <Input
          placeholder="Buscar reservas..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtrar por Fecha</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onSortChange}
            className="relative group"
          >
            {sortDirection === 'asc' ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};