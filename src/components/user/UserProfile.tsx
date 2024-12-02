import { useState } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export const UserProfile = () => {
  const { profile, isLoading, updateProfile, isPending } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    phone_number: profile?.phone_number || '',
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedProfile = await updateProfile(formData)
      if (updatedProfile) {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been successfully updated.',
        })
        setIsEditing(false)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            disabled={!isEditing || isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <Input
            type="text"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            disabled={!isEditing || isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            type="tel"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
            disabled={!isEditing || isPending}
          />
        </div>

        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={isPending}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
