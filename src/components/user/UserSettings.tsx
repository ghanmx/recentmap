import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export const UserSettings = () => {
  const { toast } = useToast()

  const handleLogout = () => {
    // Add your logout logic here
    toast({
      title: 'Cerraste sesión',
      description: 'Tu sesión ha sido cerrada correctamente.',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Configuración de Cuenta</h2>
      <Card className="p-6 gradient-border">
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <Settings className="w-12 h-12 mb-4" />
          <p>Configuración de cuenta próximamente</p>
        </div>
      </Card>

      <Button
        variant="destructive"
        className="w-full mt-6"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Cerrar Sesión
      </Button>
    </motion.div>
  )
}
