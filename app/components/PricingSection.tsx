'use client';

export default function PricingSection() {
  const handlePlanSelect = (plan: string) => {
    console.log('Button clicked for plan:', plan);
    console.log('About to navigate to:', `/register?plan=${plan}`);
    
    try {
      window.location.href = `/register?plan=${plan}`;
      console.log('Navigation initiated');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <section id="pricing" className="max-w-4xl mx-auto text-center">
      <h3 className="text-4xl font-bold text-white mb-4">What's the Cost?</h3>
      <p className="mb-8 max-w-2xl mx-auto">
        Before you think about the price, consider how much you could earn. This isn't a cost—it's an investment in your success. 
        You could recoup your investment with your very first bet!
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Trial Offer */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-8 bg-gray-800 rounded-2xl border-2 border-blue-500 shadow-2xl transform lg:scale-105">
          <h4 className="text-2xl font-bold text-blue-400">Try Us Risk-Free</h4>
          <p className="text-5xl font-black text-white my-4">$19</p>
          <p className="text-gray-400 mb-6">For a 2-week trial</p>
          <button
            onClick={() => handlePlanSelect('trial')}
            className="trial-button w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Start My Trial
          </button>
          <p className="text-xs text-gray-500 mt-4">Subscription continues at $299/month unless canceled.</p>
        </div>
        
        {/* Main Offer */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-8 bg-gray-800 rounded-2xl border border-gray-700">
          <h4 className="text-2xl font-bold text-white">Full Membership</h4>
          <p className="text-5xl font-black text-white my-4">$299</p>
          <p className="text-gray-400 mb-6">Per Month</p>
          <button
            onClick={() => handlePlanSelect('monthly')}
            className="cta-button w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Join Monthly
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="inline-block p-4 bg-gray-800 rounded-xl border border-gray-700">
          <h4 className="text-xl font-bold text-green-400">Best Value!</h4>
          <p className="text-3xl font-black text-white my-2">$699 for 3 Months</p>
          <button
            onClick={() => handlePlanSelect('quarterly')}
            className="cta-button mt-2 w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Get 3 Months & Save!
          </button>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-2 mt-8 text-gray-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
        </svg>
        <span>Secure payments by NordicProfit AB via PayPal</span>
      </div>
    </section>
  );
} 