import { supabase } from './client'
import { TowingContextType } from '@/types/towing'
import { Profile } from '@/types/user'

export const createTowingContext = (): TowingContextType => {
  return {
    totalDistance: 0,
    totalCost: 0,
    detectedTolls: [],
    totalTollCost: 0,
    truckType: 'A',
    requiresManeuver: false,
    selectedVehicleModel: '',
    tollInfo: null,
    paymentInfo: {
      subtotal: 0,
      tax: 0,
      total: 0,
      isPending: false,
      isProcessing: false,
    },
    isLoadingLocations: false,
    isProcessingPayment: false,
    updateTowingInfo: () => {},
    updateTollInfo: () => {},
    updateTruckType: () => {},
    updateManeuverRequired: () => {},
    updateSelectedVehicleModel: () => {},
    updateLocationInfo: () => {},
    processPayment: async () => false,
    fetchRequests: async () => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .select('*')
      if (error) throw error
      return data
    },
    fetchRequestById: async (id: string) => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    createRequest: async (request: any) => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .insert([request])
        .select()
      if (error) throw error
      return data[0]
    },
    updateRequest: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .update(updates)
        .eq('id', id)
        .select()
      if (error) throw error
      return data[0]
    },
    deleteRequest: async (id: string) => {
      const { error } = await supabase
        .from('vehicle_requests')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    fetchPayments: async () => {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('*')
      if (error) throw error
      return data
    },
    fetchMetrics: async () => {
      const { data: requests, error: requestsError } = await supabase
        .from('vehicle_requests')
        .select('*')
      if (requestsError) throw requestsError

      const { data: payments, error: paymentsError } = await supabase
        .from('payment_transactions')
        .select('*')
      if (paymentsError) throw paymentsError

      return {
        totalRequests: requests?.length || 0,
        totalPayments: payments?.length || 0,
      }
    },
  }
}
