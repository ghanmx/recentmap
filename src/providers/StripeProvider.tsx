import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Using a test publishable key
const stripePromise = loadStripe('pk_test_51OxpVXBIrjwXwQdF1HpkQABXYGqpWZBFGPvXVoYZtqxPZqQtQvtgWXxYGHuVZyXxWXwXwXwXwXwXwXwXwXwX');

export const StripeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};