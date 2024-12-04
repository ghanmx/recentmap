import { Info, Receipt } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TollBadgeInfoProps {
  tollCount: number
  onInfoClick: () => void
}

export const TollBadgeInfo = ({ tollCount, onInfoClick }: TollBadgeInfoProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="secondary" className="bg-blue-100">
        <Receipt className="w-4 h-4 mr-1" />
        {tollCount > 0 ? `${tollCount} Peajes Detectados` : 'Sin Peajes'}
      </Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info 
              className="w-4 h-4 text-blue-500 cursor-pointer" 
              onClick={onInfoClick}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Los peajes son calculados automáticamente basados en tu ruta</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}