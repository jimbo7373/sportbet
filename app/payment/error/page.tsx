import React from 'react';
import Link from 'next/link';

export default function PaymentErrorPage() {
  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="rounded-full bg-red-500/10 p-4 mx-auto w-20 h-20 flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Payment Failed
        </h2>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-gray-300 mb-4">
            We're sorry, but there was an error processing your payment. This could be due to:
          </p>
          
          <ul className="text-left text-gray-400 space-y-2 list-disc list-inside">
            <li>Insufficient funds</li>
            <li>Card declined</li>
            <li>Network connection issues</li>
            <li>PayPal account restrictions</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link 
            href="/payment" 
            className="block w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
          
          <Link 
            href="/support" 
            className="block w-full bg-gray-800 text-gray-300 rounded-lg px-4 py-3 font-medium hover:bg-gray-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          No charges have been made to your account. You can safely try again or contact our support team for assistance.
        </p>
      </div>
    </main>
  );
} 