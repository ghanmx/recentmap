import TowMap from '@/components/TowMap'
import { TowingProvider } from '@/contexts/towing/TowingContext'

const MapPage = () => {
  return (
    <TowingProvider>
      <TowMap />
    </TowingProvider>
  )
}

export default MapPage