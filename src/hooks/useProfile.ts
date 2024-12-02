import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { UserProfile } from '@/types/user'

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        setProfile(data)
      }
      
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      
      setProfile(data)
      return data
    }
    
    return null
  }

  return {
    profile,
    loading,
    isLoading: loading,
    updateProfile,
  }
}