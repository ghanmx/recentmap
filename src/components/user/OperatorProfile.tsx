import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const OperatorProfile = () => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/avatar-placeholder.png" />
          <AvatarFallback>OP</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Juan Pérez</h2>
          <p className="text-gray-500">Operador Senior</p>
          <Badge className="mt-2" variant="secondary">Activo</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="text-gray-900">juan.perez@empresa.com</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
          <p className="text-gray-900">+52 123 456 7890</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Zona Asignada</h3>
          <p className="text-gray-900">Zona Norte</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Servicios Completados</h3>
          <p className="text-gray-900">156</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Últimos Servicios</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-3 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Servicio #{i}</p>
                  <p className="text-sm text-gray-500">Hace {i} días</p>
                </div>
                <Badge variant="outline">Completado</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};