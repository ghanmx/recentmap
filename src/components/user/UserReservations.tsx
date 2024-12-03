import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export const UserReservations = () => {
  const { data: requests, isLoading } = useQuery({
    queryKey: ['vehicleRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehículo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  {request.vehicle_make} {request.vehicle_model} (
                  {request.vehicle_year})
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === 'completed'
                        ? 'default'
                        : request.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(request.created_at), {
                    addSuffix: true,
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.payment_status === 'completed'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {request.payment_status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}