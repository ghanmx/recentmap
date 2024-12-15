import { useEffect, useState, useCallback, useRef } from 'react'
import { Polyline } from 'react-leaflet'
import { decode } from '@mapbox/polyline'
import { showRouteNotification } from '../../utils/notificationUtils'
import { useTowing } from '../../contexts/TowingContext'
import { getRouteDetails } from '../../services/routeService'
import { COMPANY_LOCATION } from '../../utils/priceCalculator'
import { useToast } from '../../hooks/use-toast'
import { Location } from '@/types/location'

interface RoutePolylineProps {
  pickupLocation: Location
  dropLocation: Location
  onRouteCalculated?: (distance: number) => void
}

export const RoutePolyline = ({
  pickupLocation,
  dropLocation,
  onRouteCalculated,
}: RoutePolylineProps) => {
  const [companyToPickupRoute, setCompanyToPickupRoute] = useState<[number, number][]>([])
  const [pickupToDropRoute, setPickupToDropRoute] = useState<[number, number][]>([])
  const [dropToCompanyRoute, setDropToCompanyRoute] = useState<[number, number][]>([])
  const { updateTowingInfo } = useTowing()
  const { toast } = useToast()
  const isFetching = useRef(false)

  const fetchRoutes = useCallback(async () => {
    if (isFetching.current) return

    isFetching.current = true
    try {
      console.log('Calculating routes for complete journey...')

      const companyToPickup = await getRouteDetails(COMPANY_LOCATION, pickupLocation)
      setCompanyToPickupRoute(decode(companyToPickup.geometry).map(([lat, lng]) => [lat, lng]))
      console.log('Company to pickup distance:', companyToPickup.distance)

      const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation)
      setPickupToDropRoute(decode(pickupToDrop.geometry).map(([lat, lng]) => [lat, lng]))
      console.log('Pickup to drop distance:', pickupToDrop.distance)

      const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION)
      setDropToCompanyRoute(decode(dropToCompany.geometry).map(([lat, lng]) => [lat, lng]))
      console.log('Drop to company distance:', dropToCompany.distance)

      const totalDistance = (
        companyToPickup.distance +
        pickupToDrop.distance +
        dropToCompany.distance
      ) / 1000

      console.log('Total journey distance:', totalDistance)

      updateTowingInfo(totalDistance)
      onRouteCalculated?.(totalDistance)

      showRouteNotification(totalDistance)

      toast({
        title: 'Ruta calculada',
        description: `Distancia total del viaje: ${totalDistance.toFixed(2)}km`,
        className: 'bg-green-50 border-green-200 text-green-800',
      })
    } catch (error) {
      console.error('Error calculating routes:', error)
      toast({
        title: 'Error al calcular la ruta',
        description: error instanceof Error ? error.message : 'Por favor, intente nuevamente',
        variant: 'destructive',
      })
    } finally {
      isFetching.current = false
    }
  }, [pickupLocation, dropLocation, updateTowingInfo, onRouteCalculated, toast])

  useEffect(() => {
    fetchRoutes()
  }, [fetchRoutes])

  return (
    <>
      {companyToPickupRoute.length > 0 && (
        <Polyline
          positions={companyToPickupRoute}
          color="blue"
          weight={3}
          dashArray="10, 10"
          opacity={0.7}
        />
      )}
      {pickupToDropRoute.length > 0 && (
        <Polyline
          positions={pickupToDropRoute}
          color="green"
          weight={3}
          opacity={0.9}
        />
      )}
      {dropToCompanyRoute.length > 0 && (
        <Polyline
          positions={dropToCompanyRoute}
          color="red"
          weight={3}
          dashArray="10, 10"
          opacity={0.7}
        />
      )}
    </>
  )
}