import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useUserProfile } from './hooks/useUserProfile'
import { Loader2, User } from 'lucide-react'
import { motion } from 'framer-motion'

export const UserProfile = () => {
  const { profile, isLoading, updateProfile } = useUserProfile()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    phone_number: '',
    bio: '',
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const handleEdit = () => {
    setFormData({
      full_name: profile?.full_name || '',
      username: profile?.username || '',
      phone_number: profile?.phone_number || '',
      bio: profile?.bio || '',
    })
    setEditMode(true)
  }

  const handleSave = async () => {
    await updateProfile.mutateAsync(formData)
    setEditMode(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {profile?.full_name || 'Usuario'}
              </h3>
              <p className="text-gray-500">@{profile?.username || 'username'}</p>
            </div>
          </div>
          {!editMode && (
            <Button onClick={handleEdit}>Editar Perfil</Button>
          )}
        </div>

        {editMode ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre Completo</label>
              <Input
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nombre de Usuario</label>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <Input
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Biografía</label>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
                disabled={updateProfile.isPending}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Guardar Cambios
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <p className="mt-1 text-gray-600">
                {profile?.phone_number || 'No especificado'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Biografía</label>
              <p className="mt-1 text-gray-600">
                {profile?.bio || 'No hay biografía disponible'}
              </p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}