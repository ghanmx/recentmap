import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Phone, Shield, User, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

export const NavigationBar = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleAdminAccess = () => {
    setIsAdmin(true)
    toast({
      title: 'Modo Administrador Activado',
      description: 'Has accedido como administrador (modo prueba)',
    })
    navigate('/admin')
  }

  const handleUserAccess = () => {
    navigate('/user')
  }

  return (
    <div className="relative z-20 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Navegación</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={() => navigate('/')}
                    >
                      <div className="text-sm font-medium leading-none">Inicio</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Volver a la página principal
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar..."
                className="pl-10 w-[200px]"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleUserAccess}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Usuario</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleAdminAccess}
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}