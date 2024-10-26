import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Calendar, CheckCircle } from "lucide-react";

interface PaymentWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSubmit: (result: { success: boolean; error?: string }) => void;
  totalCost: number;
}

const PaymentWindow = ({ isOpen, onClose, onPaymentSubmit, totalCost }: PaymentWindowProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Payment system is not ready. Please try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({
        title: "Error",
        description: "Card element not found.",
        variant: "destructive",
      });
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

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      
      onPaymentSubmit({ success: true });
      onClose();
    } catch (err: any) {
      toast({
        title: "Payment Failed",
        description: err.message || "An error occurred during payment processing",
        variant: "destructive",
      });
      onPaymentSubmit({ success: false, error: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="w-5 h-5 text-primary" />
            Secure Payment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <CardElement 
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

          <div className="flex items-center justify-between px-2 text-gray-700">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Service Date
            </span>
            <span className="font-semibold">Today</span>
          </div>

          <div className="flex items-center justify-between px-2 text-gray-700">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              Total Amount
            </span>
            <span className="text-lg font-bold text-primary">
              ${totalCost.toFixed(2)}
            </span>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isProcessing}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white min-w-[120px]"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentWindow;