import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ServiceRequest } from '@/types/service'

const mockData = [
  { name: 'Ene', servicios: 4 },
  { name: 'Feb', servicios: 6 },
  { name: 'Mar', servicios: 8 },
  { name: 'Abr', servicios: 5 },
  { name: 'May', servicios: 7 },
]

export const ServiceSummary = () => {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resumen de Servicios</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="servicios" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="p-4 bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-900">
            Total Servicios
          </h3>
          <p className="text-3xl font-bold text-blue-600">30</p>
        </Card>
        <Card className="p-4 bg-green-50">
          <h3 className="text-lg font-semibold text-green-900">Completados</h3>
          <p className="text-3xl font-bold text-green-600">25</p>
        </Card>
        <Card className="p-4 bg-purple-50">
          <h3 className="text-lg font-semibold text-purple-900">En Proceso</h3>
          <p className="text-3xl font-bold text-purple-600">5</p>
        </Card>
      </div>
    </Card>
  )
}
