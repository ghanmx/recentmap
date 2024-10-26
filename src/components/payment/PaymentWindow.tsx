import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful payment
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-md">
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
              }}
            />
          </div>
          <div className="text-lg font-semibold">
            Total Amount: ${totalCost.toFixed(2)}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isProcessing}
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