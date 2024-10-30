import { Button } from "@/components/ui/button";
import { Copy, CreditCard } from "lucide-react";

interface VehicleFormActionsProps {
  onDownload: (format: 'csv' | 'txt') => Promise<void>;
  onCopy: () => void;
  onSubmit: () => void;
  isPending: boolean;
}

export const VehicleFormActions = ({ onDownload, onCopy, onSubmit, isPending }: VehicleFormActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('csv')}
        className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50"
      >
        CSV
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('txt')}
        className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        TXT
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCopy}
        className="flex-1 bg-white hover:bg-gray-50"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copiar
      </Button>
      <Button
        type="submit"
        disabled={isPending}
        onClick={onSubmit}
        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        {isPending ? (
          "Procesando..."
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Continuar al Pago
          </div>
        )}
      </Button>
    </div>
  );
};