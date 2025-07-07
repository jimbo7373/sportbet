'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializePayPal = () => {
    if (isInitialized) {
      console.log('PayPal already initialized, skipping...');
      return;
    }

    console.log('Initializing PayPal with:', { amount, planType, email });
    
    if (!window.paypal) {
      console.error('PayPal SDK not loaded');
      setError('PayPal SDK failed to load');
      setIsLoading(false);
      return;
    }

    // Clear the container first
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    try {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          console.log('Creating PayPal order...');
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              },
              description: `Swebets ${planType} Subscription - ${email}`,
              custom_id: `${planType}-${email}-${Date.now()}`
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
              brand_name: 'Jim\'s Sportbets',
              landing_page: 'BILLING',
              user_action: 'PAY_NOW'
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            console.log('Payment approved, capturing...');
            const order = await actions.order.capture();
            
            console.log('Payment successful:', order);
            
            const paymentData = {
              orderId: order.id,
              amount: amount,
              planType: planType,
              email: email,
              status: 'completed',
              paymentTime: new Date().toISOString(),
              payerInfo: order.payer
            };
            
            sessionStorage.setItem('paymentSuccess', JSON.stringify(paymentData));
            sessionStorage.setItem('customerAuth', 'true');
            
            router.push('/customer?payment=success');
            
          } catch (error) {
            console.error('Payment capture failed:', error);
            setError('Payment processing failed');
            router.push('/payment/error');
          }
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          setError('PayPal error occurred');
          router.push('/payment/error');
        },
        onCancel: (data: any) => {
          console.log('Payment cancelled by user:', data);
        },
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          height: 45
        }
      }).render('#paypal-button-container').then(() => {
        console.log('PayPal button rendered successfully');
        setIsLoading(false);
        setIsInitialized(true);
      }).catch((err: any) => {
        console.error('PayPal button render failed:', err);
        setError('Failed to render PayPal button');
        setIsLoading(false);
      });
    } catch (err) {
      console.error('PayPal initialization error:', err);
      setError('PayPal initialization failed');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset initialization state when props change
    setIsInitialized(false);
    setIsLoading(true);
    setError(null);
  }, [amount, planType, email]);

  return (
    <div>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=Aa4Jkk55NCchqEbfnTSkuguZeBPLvxoI_uj3QxKoezOzlYkf-Kc9Ef_5ZZUAyCHNjyDlLk1kl0sYIhGS&currency=USD&intent=capture&disable-funding=credit,card"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('PayPal SDK loaded successfully');
          if (!isInitialized) {
            initializePayPal();
          }
        }}
        onError={() => {
          console.error('Failed to load PayPal SDK');
          setError('Failed to load PayPal SDK');
          setIsLoading(false);
        }}
      />
      
      <div className="mt-4">
        {isLoading && !isInitialized && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-300">Loading PayPal...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-800 border border-red-600 rounded-lg p-4 mb-4">
            <p className="text-red-200 text-sm">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setIsInitialized(false);
                setIsLoading(true);
                if (window.paypal) {
                  initializePayPal();
                } else {
                  window.location.reload();
                }
              }} 
              className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
        
        <div id="paypal-button-container" ref={containerRef} className="min-h-[50px]"></div>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-400">
        <p>🔒 Secure test payment with PayPal Sandbox</p>
        <p className="mt-1">By clicking PayPal, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
} 