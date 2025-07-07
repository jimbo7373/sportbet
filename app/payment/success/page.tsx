import React from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="rounded-full bg-green-500/10 p-4 mx-auto w-20 h-20 flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h2>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-gray-300 mb-4">
            Thank you for subscribing to Swebets! Your account has been activated and you now have full access to our services.
          </p>
          
          <div className="space-y-2 text-left text-gray-400">
            <p>✓ Access to daily betting tips</p>
            <p>✓ Expert analysis and predictions</p>
            <p>✓ Premium support</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="block w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          
          <Link 
            href="/support" 
            className="block w-full bg-gray-800 text-gray-300 rounded-lg px-4 py-3 font-medium hover:bg-gray-700 transition-colors"
          >
            Need Help?
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </main>
  );
} 