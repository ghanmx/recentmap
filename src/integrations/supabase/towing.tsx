import { createClient } from '@supabase/supabase-js'
import { Database } from './types'
import { TollLocation } from '@/types/toll'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const getTowingRequests = async () => {
  const { data, error } = await supabase
    .from('towing_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export const createTowingRequest = async (request: any) => {
  const { data, error } = await supabase
    .from('towing_requests')
    .insert([request])
    .select()

  if (error) {
    throw error
  }

  return data[0]
}

export const updateTowingRequest = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('towing_requests')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    throw error
  }

  return data[0]
}

export const deleteTowingRequest = async (id: string) => {
  const { error } = await supabase
    .from('towing_requests')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}

export const getTowingRequestById = async (id: string) => {
  const { data, error } = await supabase
    .from('towing_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data
}

export const getTowingRequestsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('towing_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export const updateTolls = (tolls: TollLocation[], tollCost: number) => {
  const updatedTolls = tolls.map(toll => ({
    ...toll,
    cost: toll.cost + (tollCost / tolls.length)
  }))

  return {
    tolls: updatedTolls,
    totalTollCost: updatedTolls.reduce((sum, toll) => sum + toll.cost, 0)
  }
}

export const calculateTowingCost = (distance: number, vehicleType: string) => {
  const baseRate = vehicleType === 'heavy' ? 2.5 : 1.8
  return distance * baseRate
}

export const validateTowingRequest = (request: any) => {
  const requiredFields = ['pickup_location', 'drop_location', 'vehicle_type']
  const missingFields = requiredFields.filter(field => !request[field])

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
  }

  return true
}

export const processTowingPayment = async (paymentDetails: any) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([paymentDetails])
    .select()

  if (error) {
    throw error
  }

  return data[0]
}

export const getTowingMetrics = async () => {
  const { data, error } = await supabase
    .from('towing_metrics')
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}