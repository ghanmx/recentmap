import { supabase } from './client'
import { TowingContextType } from '@/types/towing'
import { Profile } from '@/types/user'

export const useTowing = (): TowingContextType => {
  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('vehicle_requests')
      .select('*')
    if (error) throw error
    return data
  }

  const fetchRequestById = async (id: string) => {
    const { data, error } = await supabase
      .from('vehicle_requests')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  const createRequest = async (request: any) => {
    const { data, error } = await supabase
      .from('vehicle_requests')
      .insert([request])
      .select()
    if (error) throw error
    return data[0]
  }

  const updateRequest = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('vehicle_requests')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  }

  const deleteRequest = async (id: string) => {
    const { error } = await supabase
      .from('vehicle_requests')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('*')
    if (error) throw error
    return data
  }

  const fetchMetrics = async () => {
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
  }

  return {
    fetchRequests,
    fetchRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
    fetchPayments,
    fetchMetrics,
  }
}
