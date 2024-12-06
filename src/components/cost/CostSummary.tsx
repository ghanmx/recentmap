import { CostItemDisplay } from './CostItemDisplay'
import { TollInfoDisplay } from '../TollInfoDisplay'
import { Receipt } from 'lucide-react'
import { Separator } from '../ui/separator'
import { TollLocation } from '@/types/toll'

interface CostSummaryProps {
  subtotal: number
  tax: number
  finalTotal: number
  detectedTolls: TollLocation[]
  totalTollCost: number
  requiresInvoice: boolean
}

export const CostSummary = ({
  subtotal,
  tax,
  finalTotal,
  detectedTolls,
  totalTollCost,
  requiresInvoice,
}: CostSummaryProps): JSX.Element => {
  return (
    <div className="space-y-4">
      {detectedTolls.length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 flex items-center gap-2 text-shadow-sm">
              <Receipt className="w-4 h-4 text-blue-500" />
              Costos de Peaje
            </h3>
            <TollInfoDisplay
              tolls={detectedTolls}
              totalCost={totalTollCost}
            />
          </div>
        </>
      )}

      <div className="mt-6 space-y-2 border-t pt-4">
        <CostItemDisplay
          label="Subtotal (incluyendo peajes)"
          amount={subtotal}
          description="Suma de todos los cargos incluyendo peajes"
        />
        {requiresInvoice && (
          <CostItemDisplay
            label="IVA (16%)"
            amount={tax}
            description="Impuesto al Valor Agregado"
          />
        )}
        <div className="pt-2 border-t">
          <CostItemDisplay
            label="Total Final"
            amount={finalTotal}
            className="font-bold text-lg text-shadow"
          />
        </div>
      </div>
    </div>
  )
}