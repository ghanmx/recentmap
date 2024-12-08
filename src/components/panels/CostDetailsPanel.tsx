import { PaymentSteps } from '../payment/PaymentSteps'
import { CostEstimation } from '../CostEstimation'
import { TollBreakdownPanel } from './TollBreakdownPanel'
import { CostSummary } from '../cost/CostSummary'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { TollLocation } from '@/types/toll'
import { useToast } from '@/hooks/use-toast'

interface CostDetailsPanelProps {
  steps: Array<{ title: string; description: string }>
  requiresInvoice: boolean
  setRequiresInvoice: (value: boolean) => void
  subtotal: number
  tax: number
  finalTotal: number
  detectedTolls: TollLocation[]
  totalTollCost: number
  onShowPayment: () => void
}

export const CostDetailsPanel = ({
  steps,
  requiresInvoice,
  setRequiresInvoice,
  subtotal,
  tax,
  finalTotal,
  detectedTolls,
  totalTollCost,
  onShowPayment,
}: CostDetailsPanelProps) => {
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <PaymentSteps currentStep={1} steps={steps} />
      <div className="space-y-4">
        <div className="flex items-center space-x-2 p-4 bg-white/50 rounded-lg border border-primary/10">
          <Label htmlFor="invoice" className="text-sm text-shadow-sm">
            Requiere factura (IVA 16%)
          </Label>
          <Switch
            id="invoice"
            checked={requiresInvoice}
            onCheckedChange={setRequiresInvoice}
          />
        </div>

        <CostEstimation
          onShowPayment={() => {
            onShowPayment()
            toast({
              title: "Preparando pago",
              description: "Redirigiendo al formulario de pago...",
              className: "text-shadow-sm"
            })
          }}
          subtotal={subtotal}
          tax={tax}
          finalTotal={finalTotal}
        />

        <TollBreakdownPanel
          detectedTolls={detectedTolls}
          totalTollCost={totalTollCost}
        />

        <CostSummary
          subtotal={subtotal}
          tax={tax}
          finalTotal={finalTotal}
          detectedTolls={detectedTolls}
          totalTollCost={totalTollCost}
          requiresInvoice={requiresInvoice}
        />
      </div>
    </div>
  )
}