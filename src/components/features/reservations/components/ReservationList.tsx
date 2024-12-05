import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { ServiceRequest } from '@/types/service'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ServiceCompletionDialog } from '@/components/service/ServiceCompletionDialog'

interface ReservationListProps {
  reservations: ServiceRequest[]
  isLoading: boolean
}

export const ReservationList = ({
  reservations,
  isLoading,
}: ReservationListProps) => {
  const { toast } = useToast()
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="rounded-md border"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      reservation.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </TableCell>
                <TableCell>
                  {reservation.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>{reservation.username}</TableCell>
                <TableCell>{`${reservation.vehicleYear} ${reservation.vehicleMake} ${reservation.vehicleModel}`}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: 'Ver Detalles',
                        description: `Viendo reserva ${reservation.id}`,
                      })
                    }}
                  >
                    Ver
                  </Button>
                  {reservation.status !== 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 hover:bg-green-100 text-green-700"
                      onClick={() => setSelectedRequestId(reservation.id)}
                    >
                      Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <ServiceCompletionDialog
        isOpen={!!selectedRequestId}
        onClose={() => setSelectedRequestId(null)}
        requestId={selectedRequestId || ''}
      />
    </>
  )
}