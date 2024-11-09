import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Move Stripe key to a constant
const STRIPE_PUBLIC_KEY = 'pk_test_51OxpVXBIrjwXwQdF1HpkQABXYGqpWZBFGPvXVoYZtqxPZqQtQvtgWXxYGHuVZyXxWXwXwXwXwXwXwXwXwXwX';

export const StripeProvider = ({ children }: { children: ReactNode }) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initStripe = async () => {
      try {
        const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        if (stripe) {
          setStripePromise(Promise.resolve(stripe));
        } else {
          throw new Error('Failed to initialize Stripe');
        }
      } catch (error) {
        console.error('Stripe initialization error:', error);
        toast({
          title: "Payment System Error",
          description: "Unable to initialize payment system. Please try again later.",
          variant: "destructive",
        });
      }
    };

    initStripe();
  }, [toast]);

  if (!stripePromise) {
    return null; // Or a loading spinner
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};