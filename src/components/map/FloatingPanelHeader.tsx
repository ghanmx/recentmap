import { Truck } from 'lucide-react'

export const FloatingPanelHeader = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary/10 rounded-xl shadow-inner">
          <Truck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            MRGruas
          </h1>
          <p className="text-sm text-gray-600">Servicio Profesional 24/7</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            Disponible en tu área
          </span>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
          <Phone className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            Soporte 24/7
          </span>
        </div>
      </div>
    </div>
  )
}
