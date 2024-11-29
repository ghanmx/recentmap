export type TowTruckType = 'A' | 'B' | 'C' | 'D'

export interface TowTruckDetails {
  name: string
  capacity: string
  perKm: number
  maneuverCharge: number
  maxWeight: number
}

export const downloadServiceInfo = (data: any, format: 'csv' | 'txt') => {
  const content =
    format === 'csv' ? convertToCSV(data) : JSON.stringify(data, null, 2)

  const blob = new Blob([content], {
    type: format === 'csv' ? 'text/csv' : 'text/plain',
  })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `service-info.${format}`
  a.click()
  window.URL.revokeObjectURL(url)
}

const convertToCSV = (data: any) => {
  const headers = Object.keys(data)
  const values = Object.values(data)
  return `${headers.join(',')}\n${values.join(',')}`
}
