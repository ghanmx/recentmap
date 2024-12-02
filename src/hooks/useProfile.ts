import { useState } from 'react'
import { Profile } from '@/types/user'
import { supabase } from '@/integrations/supabase/client'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setIsPending(true)
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id)
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      console.error('Error updating profile:', error)
      return null
    } finally {
      setIsPending(false)
    }
  }

  updateProfile.isPending = isPending
  updateProfile.mutateAsync = updateProfile

  return {
    profile,
    loading,
    updateProfile,
  }
}