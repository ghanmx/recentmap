import { CreditCard } from 'lucide-react'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'

export const PaymentHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
        <CreditCard className="w-5 h-5 text-primary" />
        Pago Seguro
      </DialogTitle>
    </DialogHeader>
  )
}