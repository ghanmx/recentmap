import { Json } from '@/integrations/supabase/types'

export interface Profile {
  id: string
  created_at: string
  updated_at: string
  username: string | null
  full_name: string | null
  phone_number: string | null
  avatar_url: string | null
  bio: string | null
  preferences: Json
}

export interface UserProfile extends Profile {
  email?: string
}
