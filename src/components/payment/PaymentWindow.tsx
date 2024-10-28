import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const [cardComplete, setCardComplete] = React.useState(false);

  // Reset card state when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setCardComplete(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isProcessing) {
      toast({
        title: "Payment in Progress",
        description: "Please wait while we process your payment",
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
        title: "Incomplete Card Details",
        description: "Please fill in all card information before proceeding",
        variant: "destructive",
      });
      return;
    }

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

      // Simulate payment processing
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
              onClick={handleClose}
              disabled={isProcessing}
              className="border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isProcessing || !cardComplete}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white min-w-[120px]"
            >
              {isProcessing ? "Processing..." : `Pay $${totalCost.toFixed(2)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentWindow;