import { Shield, Calendar } from 'lucide-react'

export const PaymentFooter = () => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <span className="flex items-center gap-1.5">
        <Shield className="w-4 h-4" />
        Encriptación SSL Segura
      </span>
      <span className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4" />
        {new Date().toLocaleDateString()}
      </span>
    </div>
  )
}