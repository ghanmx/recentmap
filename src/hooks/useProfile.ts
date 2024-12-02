import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return null

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setIsPending(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return null

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
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

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    isLoading,
    isPending,
    updateProfile: Object.assign(updateProfile, {
      mutateAsync: updateProfile,
      isPending
    })
  }
}