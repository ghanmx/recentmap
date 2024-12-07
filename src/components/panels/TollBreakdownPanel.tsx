import { TollLocation } from '@/types/toll'
import { Card } from '../ui/card'
import { Receipt } from 'lucide-react'
import { TollBreakdownSection } from '../cost/TollBreakdownSection'
import { Separator } from '../ui/separator'

interface TollBreakdownPanelProps {
  detectedTolls: TollLocation[]
  totalTollCost: number
}

export const TollBreakdownPanel = ({
  detectedTolls,
  totalTollCost,
}: TollBreakdownPanelProps) => {
  if (detectedTolls.length === 0) return null

  const outboundTolls = detectedTolls.filter(toll => toll.direction === 'outbound')
  const returnTolls = detectedTolls.filter(toll => toll.direction === 'return')

  return (
    <Card className="bg-white/95 backdrop-blur-sm p-4 shadow-lg border-blue-100/50">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 text-shadow-sm">
            Costos de Peaje (Total: ${totalTollCost})
          </h3>
        </div>

        {outboundTolls.length > 0 && (
          <>
            <TollBreakdownSection tolls={outboundTolls} direction="outbound" />
            <Separator />
          </>
        )}

        {returnTolls.length > 0 && (
          <TollBreakdownSection tolls={returnTolls} direction="return" />
        )}
      </div>
    </Card>
  )
}