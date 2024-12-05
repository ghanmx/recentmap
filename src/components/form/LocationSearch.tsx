import { LocationSearchContainer } from './location-search/LocationSearchContainer'
import { LocationSearchProps } from '@/types/location-search'

export const LocationSearch = (props: LocationSearchProps) => {
  return <LocationSearchContainer {...props} />
}