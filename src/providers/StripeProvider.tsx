import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

export const StripeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};