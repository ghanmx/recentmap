import { Json } from '@/integrations/supabase/types'

export interface UserProfile {
  id: string
  username: string | null
  full_name: string | null
  phone_number: string | null
  avatar_url: string | null
  bio: string | null
  preferences: Json
  created_at: string
  updated_at: string
}

export interface UserProfileState {
  profile: UserProfile | null
  loading: boolean
  isLoading?: boolean
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile | null>
}