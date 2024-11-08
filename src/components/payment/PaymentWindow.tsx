import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Calendar, CheckCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { processPayment, validatePaymentDetails } from "@/utils/paymentProcessor";

interface PaymentWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSubmit?: (result: { success: boolean; error?: string }) => void;
  amount: number;
}

const PaymentWindow = ({ isOpen, onClose, onPaymentSubmit, amount = 0 }: PaymentWindowProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [cardComplete, setCardComplete] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setCardComplete(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isProcessing) {
      toast({
        title: "Pago en Proceso",
        description: "Por favor, espere mientras procesamos su pago",
        variant: "destructive",
      });
      return;
    }
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cardComplete) {
      toast({
        title: "Datos Incompletos",
        description: "Por favor, complete todos los datos de la tarjeta",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Sistema de pago no disponible. Intente más tarde.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!validatePaymentDetails(cardElement)) {
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      const result = await processPayment(amount);

      if (result.success) {
        toast({
          title: "Pago Exitoso",
          description: `Transacción completada. ID: ${result.transactionId}`,
        });
        onPaymentSubmit?.({ success: true });
        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast({
        title: "Error en el Pago",
        description: err.message || "Ocurrió un error al procesar el pago",
        variant: "destructive",
      });
      onPaymentSubmit?.({ success: false, error: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50 border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <CreditCard className="w-5 h-5 text-primary" />
            Pago Seguro
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <CardElement 
                onChange={(e) => setCardComplete(e.complete)}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>

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

            <div className="flex items-center justify-between px-2">
              <span className="text-sm text-gray-600">Cargo por Servicio</span>
              <span className="text-lg font-semibold text-primary">
                ${amount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing}
              className="border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isProcessing || !cardComplete}
              className={cn(
                "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white min-w-[120px]",
                isProcessing && "opacity-80"
              )}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Pagar ${amount.toFixed(2)}
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentWindow;