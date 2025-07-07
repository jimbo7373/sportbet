import React from 'react';
import PayPalButton from './PayPalButton';

const planDetails = {
  trial: {
    name: 'Trial Plan',
    price: 19,
    duration: '2 weeks',
  },
  monthly: {
    name: 'Monthly Plan',
    price: 299,
    duration: '1 month',
  },
  quarterly: {
    name: 'Quarterly Plan',
    price: 699,
    duration: '3 months',
  },
};

export default function PaymentPage({
  searchParams,
}: {
  searchParams: { plan: string; email: string };
}) {
  const selectedPlan = planDetails[searchParams.plan as keyof typeof planDetails] || planDetails.monthly;

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Complete Your Payment</h2>
          <p className="mt-2 text-gray-300">
            {selectedPlan.name} - ${selectedPlan.price}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Duration: {selectedPlan.duration}
          </p>
        </div>

        <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-lg font-medium text-white">Order Summary</h3>
              <dl className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Plan</dt>
                  <dd className="text-white">{selectedPlan.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Duration</dt>
                  <dd className="text-white">{selectedPlan.duration}</dd>
                </div>
                <div className="flex justify-between font-medium">
                  <dt className="text-gray-400">Total</dt>
                  <dd className="text-white">${selectedPlan.price}</dd>
                </div>
              </dl>
            </div>

            <div>
              <PayPalButton 
                amount={selectedPlan.price}
                planType={searchParams.plan}
                email={searchParams.email}
              />
            </div>

            <div className="text-center text-sm text-gray-400">
              <p>Secure payment processed by PayPal</p>
              <p className="mt-1">Your subscription will start immediately after payment</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 