import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// For development, use these fallback values if env vars are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://fhisqbevtkjdcokqeoqa.supabase.co'
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoaXNxYmV2dGtqZGNva3Flb3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5MjA0MDAsImV4cCI6MjAyMzQ5NjQwMH0.dPTGt8OLhxq-KfqYKwVRkKkqE8fXHQa_PKhF5LqQyYE'

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
