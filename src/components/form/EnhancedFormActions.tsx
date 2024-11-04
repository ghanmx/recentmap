import { Button } from "@/components/ui/button";
import { CreditCard, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface EnhancedFormActionsProps {
  onCopy: () => void;
  isCopied: boolean;
  isPending: boolean;
}

export const EnhancedFormActions = ({ onCopy, isCopied, isPending }: EnhancedFormActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="space-y-4"
    >
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onCopy}
          className="transition-all duration-300 hover:bg-primary/10 active:scale-95"
        >
          {isCopied ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold group relative overflow-hidden"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando Solicitud...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <CreditCard className="h-5 w-5" />
              Continuar al Pago
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};