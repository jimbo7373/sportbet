import React from 'react'

export default function MainContent() {
  return (
    <main className="container mx-auto px-6 py-16">
      {/* Long Copy / The Problem & Solution */}
      <section className="max-w-4xl mx-auto text-lg leading-relaxed mb-20">
        <p className="mb-6">
          Do you love sports betting? Whether it's wagering on the odds, playing V75, or trying your luck at online poker, 
          you probably also love the thrill of winning money. But let's be honest—winning consistently isn't easy. 
          Something always seems to go wrong: Bolton miraculously ties Arsenal, or that horse you didn't bet on suddenly 
          finds superpowers and sprints to victory. Sound familiar?
        </p>
        <p className="mb-6">
          You might be thinking you'll never hit the big wins. Maybe you feel you don't have the time to master horse racing, 
          the English Premier League, or whatever sport you love to bet on. Perhaps you're starting to wonder if those massive 
          payouts—like 13 correct on the pools or other jackpots—are just a myth. Sure, the excitement of betting is fun, 
          but wouldn't it be even better if you actually won money?
        </p>
        <p className="mb-6 text-red-400 font-semibold">
          You're not alone. Over 95% of sports bettors fail to come out ahead. Many throw away their hard-earned cash because 
          they lack a strategy. One small mistake, and their money is gone for good.
        </p>
        <p className="mb-8">
          But what if there was a solution to those constant losses? A service that does the heavy lifting for you, 
          helping you find winning betting systems without the hassle?
        </p>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-blue-500/30">
          <h3 className="text-4xl font-bold text-center text-white mb-4">
            Introducing Swebets – The Science of Winning
          </h3>
          <p className="text-center mb-6">
            Swebets is a proven betting system built on expertise, not luck or gut feelings. We turn betting into a science, 
            not a guessing game. And the best part? It only takes 10 minutes a day—time anyone can spare. You don't need a 
            fat bankroll to get started, either. Begin with just a couple hundred bucks, and watch it double (and double 
            again… and again…). We do all the work while you sit back and watch the money roll into your account.
          </p>
          <p className="text-center text-xl font-semibold text-green-400">
            Imagine what those extra winnings could mean for you. A dream vacation? A new car? A better lifestyle? 
            Whatever your goals, Swebets makes them possible.
          </p>
        </div>
      </section>

      {/* PAS Section */}
      <section className="bg-gray-800 rounded-2xl p-8 md:p-12 mb-20 border border-gray-700">
        <h3 className="text-3xl font-bold text-white mb-6 text-center">
          The Frustrating Cycle of "Almost Winning"
        </h3>
        
        {/* Problem */}
        <div className="mb-8">
          <h4 className="text-2xl font-semibold text-red-400 mb-3">
            Problem: The Gut Feeling That Costs You Money
          </h4>
          <p>
            You follow your favorite team, you know the players, and you have a "gut feeling" about the match. 
            You place your bet, confident this is the one. Then, a last-minute goal, a questionable penalty, 
            or a fluke play turns your winning ticket into trash. The facts are, betting on emotion is a documented 
            path to an empty wallet. It feels like you're doing everything right, but you're still part of the 95% 
            who consistently lose.
          </p>
        </div>

        {/* Agitate */}
        <div className="mb-8">
          <h4 className="text-2xl font-semibold text-red-400 mb-3">
            Agitate: The True Cost of Guesswork
          </h4>
          <p>
            Think about the hours you've spent researching, only to be let down. Consider the "what ifs" that keep you 
            up at night—if only you'd picked the other team. It's more than just the money you lose; it's the frustration 
            of seeing your hard-earned cash vanish. This cycle of hope and disappointment can turn a fun hobby into a 
            source of stress, making you question if it's even possible to come out ahead without dedicating your entire 
            life to statistical analysis.
          </p>
        </div>

        {/* Solve */}
        <div className="bg-gray-900 p-6 rounded-lg border border-green-500/50">
          <h4 className="text-2xl font-semibold text-green-400 mb-3">
            Solution: A Methodical, Data-Driven System
          </h4>
          <p>
            This is where Swebets changes the game. We eliminate guesswork and emotion. Our system is not based on hunches; 
            it is built on years of historical data, performance analysis, and identifying high-value opportunities that 
            the average bettor overlooks. We don't bet on every match. We bet on the *right* ones. By providing you with 
            meticulously researched tips, we give you a clear, actionable advantage. You are no longer gambling; you are 
            investing in a proven methodology. This is how you move from the 95% who lose to the 5% who win.
          </p>
        </div>
      </section>

      {/* About Jim Saari Section */}
      <section className="bg-gray-800 rounded-2xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-8">
        <img 
          src="https://placehold.co/400x400/1F2937/FFFFFF?text=Jim+Saari" 
          alt="Jim Saari" 
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 flex-shrink-0"
        />
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">
            How Do We Achieve an 80% Win Rate?
          </h3>
          <p className="mb-4">
            Great question! Let me introduce myself. I'm Jim Saari, a proud Gothenburg native and lifelong sports lover. 
            I've been obsessed with sports and betting since I was a kid... When the internet revolutionized sports betting 
            around 2004, I discovered new opportunities, like betting on outcomes *not* happening. This led me to develop 
            my own systems, which I refined over the years. By 2009, I decided to make sports trading and betting a major 
            part of my income. That's when Swebets was born.
          </p>
          <p className="font-semibold text-blue-400">
            The Proof Is in the Numbers: After years of perfecting my approach, I've achieved results like an 89% accuracy 
            rate in English greyhound racing when betting on dogs *not* to win. I don't gamble. I bet only on sure winners 
            with high payouts.
          </p>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="mb-20">
        <h3 className="text-4xl font-bold text-center text-white mb-10">
          What You Get with Swebets
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* Feature Items */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <svg className="w-12 h-12 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">Daily Football Tips</h4>
            <p>Monday through Saturday, covering Europe's top leagues with our "Best Bet of the Day."</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <svg className="w-12 h-12 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">Horse Racing & V75</h4>
            <p>Every Saturday for trav and V75, plus daily UK Greyhound & Horse Racing tips.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <svg className="w-12 h-12 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">Simple Process</h4>
            <p>Spend just 10 minutes a day following our clear, expert tips on our website.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8z"></path>
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">Full Support</h4>
            <p>Get help in English via phone, email, or Skype, plus easy-to-follow video tutorials.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">Weekly Recaps</h4>
            <p>Every Sunday, we transparently review the week's performance and results.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">No Commitment</h4>
            <p>Stay a member only as long as you want. You can cancel anytime, no questions asked.</p>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="mb-20">
        <h3 className="text-4xl font-bold text-center text-white mb-10">
          Proven Results You Can Count On
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-900/50 border border-green-500/50 p-6 rounded-lg text-center">
            <p className="text-sm text-green-300 uppercase">July</p>
            <p className="text-4xl font-bold text-white">+28 points</p>
            <p className="text-green-200">(+$2,800 per $100 staked)</p>
          </div>
          
          <div className="bg-green-900/50 border border-green-500/50 p-6 rounded-lg text-center">
            <p className="text-sm text-green-300 uppercase">June</p>
            <p className="text-4xl font-bold text-white">19 Straight Wins</p>
            <p className="text-green-200">(+19 points / +$1,900)</p>
          </div>
          
          <div className="bg-green-900/50 border border-green-500/50 p-6 rounded-lg text-center">
            <p className="text-sm text-green-300 uppercase">April</p>
            <p className="text-4xl font-bold text-white">+17.5 points</p>
            <p className="text-green-200">(+$1,750 per $100 staked)</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
            <a href="#" className="trial-button w-full block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
              Start My Trial
            </a>
            <p className="text-xs text-gray-500 mt-4">Subscription continues at $299/month unless canceled.</p>
          </div>
          
          {/* Main Offer */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-8 bg-gray-800 rounded-2xl border border-gray-700">
            <h4 className="text-2xl font-bold text-white">Full Membership</h4>
            <p className="text-5xl font-black text-white my-4">$299</p>
            <p className="text-gray-400 mb-6">Per Month</p>
            <a href="#" className="cta-button w-full block bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
              Join Monthly
            </a>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="inline-block p-4 bg-gray-800 rounded-xl border border-gray-700">
            <h4 className="text-xl font-bold text-green-400">Best Value!</h4>
            <p className="text-3xl font-black text-white my-2">$699 for 3 Months</p>
            <a href="#" className="cta-button mt-2 w-full block bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
              Get 3 Months & Save!
            </a>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-2 mt-8 text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
          </svg>
          <span>Secure payments by NordicProfit AB via PayPal</span>
        </div>
      </section>
    </main>
  )
} 