import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ServiceRequest } from "@/types/service";
import { DownloadButtons } from "../form/DownloadButtons";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReservationL ist } from "@/features/reservations/components/ReservationList";
import { ReservationFilters } from "@/features/reservations/components/ReservationFilters";

interface ReservationManagementProps {
  searchQuery?: string;
}

export const ReservationManagement = ({ searchQuery = "" }: ReservationManagementProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  const mockReservations: ServiceRequest[] = [
    {
      id: "1",
      status: "pending",
      createdAt: new Date(),
      username: "John Doe",
      vehicleMake: "Toyota",
      vehicleModel: "Camry",
      vehicleYear: 2020,
      vehicleColor: "Blue",
      truckType: "standard",
      issueDescription: "Flat tire",
      serviceType: "standard",
      requiresManeuver: false,
      tollFees: 0
    },
  ];

  const handleDownload = async (format: 'csv' | 'txt') => {
    setIsLoading(true);
    try {
      const data = mockReservations;
      const content = format === 'csv'
        ? `ID,Status,Created At,Username\n${data.map(r => `${r.id},${r.status},${r.createdAt},${r.username}`).join('\n')}`
        : JSON.stringify(data, null, 2);

      const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reservations.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Descarga Completada",
        description: `Reservas exportadas como ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Error en la Exportación",
        description: "No se pudieron exportar las reservas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    toast({
      title: "Lista Ordenada",
      description: `Ordenado por fecha ${sortDirection === 'asc' ? 'descendente' : 'ascendente'}`,
    });
  };

  const filteredReservations = mockReservations
    .filter(res =>
      res.username.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      res.vehicleMake.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      res.vehicleModel.toLowerCase().includes(localSearchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <Card className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Reservas</h2>
          <DownloadButtons onDownload={handleDownload} />
        </div>

        <ReservationFilters
          searchQuery={localSearchQuery}
          onSearchChange={setLocalSearchQuery}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          sortDirection={sortDirection}
          onSortChange={handleSort}
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-8"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </motion.div>
          ) : (
            <ReservationList
              reservations={filteredReservations}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};