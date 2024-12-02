import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export const useProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          setProfile(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = async (updates: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)

        if (error) throw error
        return data
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  return { profile, loading, updateProfile }
}