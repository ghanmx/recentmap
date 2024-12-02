import { TollLocation } from '@/types/toll'
import { monterreyTolls } from './tolls/monterrey'
import { saltilloTolls } from './tolls/saltillo'
import { zacatecasTolls } from './tolls/zacatecas'
import { monclovaTolls } from './tolls/monclova'

export const TOLL_LOCATIONS: TollLocation[] = [
  ...monterreyTolls,
  ...saltilloTolls,
  ...zacatecasTolls,
  ...monclovaTolls
]

export type { TollLocation }