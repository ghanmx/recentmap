import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Download, CreditCard } from "lucide-react";

interface VehicleFormActionsProps {
  onDownload: (format: 'csv' | 'txt') => Promise<void>;
  onCopy: () => void;
  onSubmit: () => void;
  isPending: boolean;
  formData: string;
}

export const VehicleFormActions = ({
  onDownload,
  onCopy,
  onSubmit,
  isPending,
  formData
}: VehicleFormActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('csv')}
        className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50"
      >
        <Download className="w-4 h-4 mr-2" />
        CSV
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('txt')}
        className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <Download className="w-4 h-4 mr-2" />
        TXT
      </Button>
      <CopyButton
        text={formData}
        onCopy={onCopy}
        className="flex-1 bg-white hover:bg-gray-50"
      />
      <Button
        type="submit"
        disabled={isPending}
        onClick={onSubmit}
        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Procesando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Continuar al Pago
          </span>
        )}
      </Button>
    </div>
  );
};