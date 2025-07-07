'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaymentData {
  orderId: string;
  amount: number;
  planType: string;
  email: string;
  status: string;
  paymentTime: string;
  payerInfo?: any;
}

export default function CustomerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Simple password protection (you can enhance this later with proper auth)
  const CUSTOMER_PASSWORD = 'customer123'; // Change this to your preferred password

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem('customerAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Check for payment success
    const paymentSuccess = searchParams.get('payment');
    if (paymentSuccess === 'success') {
      const storedPaymentData = sessionStorage.getItem('paymentSuccess');
      if (storedPaymentData) {
        setPaymentData(JSON.parse(storedPaymentData));
        setShowPaymentSuccess(true);
        setIsAuthenticated(true); // Auto-authenticate after successful payment
      }
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CUSTOMER_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('customerAuth', 'true');
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('customerAuth');
    sessionStorage.removeItem('paymentSuccess');
    setPassword('');
    setPaymentData(null);
    setShowPaymentSuccess(false);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Jim's Sportbets Logo" 
                className="h-20 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-white">Customer Access</h2>
            <p className="mt-2 text-gray-300">
              Please enter the customer password to continue
            </p>
          </div>

          <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Customer Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter customer password"
                  />
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Access Customer Area
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Jim's Sportbets Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">Customer Testing Place</h1>
          <p className="mt-2 text-gray-300">
            Welcome to the customer dashboard
          </p>
        </div>

        {/* Payment Success Alert */}
        {showPaymentSuccess && paymentData && (
          <div className="bg-green-800 border border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-200">Payment Successful!</h3>
                <div className="mt-2 text-sm text-green-300">
                  <p>Thank you for your subscription to the <strong>{paymentData.planType}</strong> plan.</p>
                  <p>Order ID: <span className="font-mono">{paymentData.orderId}</span></p>
                  <p>Amount: <strong>${paymentData.amount}</strong></p>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setShowPaymentSuccess(false)}
                  className="text-green-400 hover:text-green-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dynamic content based on payment data */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Subscription Status</h3>
              <p className="text-gray-300">{paymentData ? 'Active' : 'Pending'}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Current Plan</h3>
              <p className="text-gray-300">{paymentData ? `${paymentData.planType} Plan` : 'No Plan'}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Member Since</h3>
              <p className="text-gray-300">
                {paymentData ? new Date(paymentData.paymentTime).toLocaleDateString() : 'N/A'}
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Last Payment</h3>
              <p className="text-gray-300">${paymentData ? paymentData.amount : '0'}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Payment Status</h3>
              <p className="text-gray-300">{paymentData ? 'Completed' : 'Pending'}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Order ID</h3>
              <p className="text-gray-300 text-sm font-mono">
                {paymentData ? paymentData.orderId.substring(0, 16) + '...' : 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              {paymentData ? (
                <div className="space-y-2">
                  <p className="text-green-400">✅ Payment completed successfully</p>
                  <p className="text-gray-300">Subscription activated for {paymentData.planType} plan</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(paymentData.paymentTime).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-gray-300 text-center">
                  This is your customer testing area. Complete a payment to see your subscription details.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 