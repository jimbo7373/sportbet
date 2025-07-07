import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

interface PayPalButtonProps {
  amount: number;
  planType: string;
  email: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton({ amount, planType, email }: PayPalButtonProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize PayPal button when the SDK is loaded
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              },
              description: `Swebets ${planType} Subscription`
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          // Capture the payment
          const order = await actions.order.capture();
          
          // Here you would typically:
          // 1. Send the order details to your backend
          // 2. Create the subscription
          // 3. Send confirmation email
          // 4. Redirect to success page
          
          router.push('/payment/success');
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          // Handle the error appropriately
          router.push('/payment/error');
        }
      }).render('#paypal-button-container');
    }
  }, [amount, planType, email, router]);

  return (
    <div>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"
        strategy="afterInteractive"
      />
      <div id="paypal-button-container" className="mt-4"></div>
      <div className="mt-4 text-xs text-center text-gray-400">
        <p>By clicking the PayPal button, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
} 