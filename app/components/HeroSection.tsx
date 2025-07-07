import React from 'react'

export default function HeroSection() {
  return (
    <section className="hero-bg py-20 md:py-32 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4">
          Discover the Proven System That Turns Your Sports Betting into Consistent Wins – Without the Guesswork!
        </h2>
        <p className="text-lg md:text-2xl font-light mb-8 max-w-4xl mx-auto">
          Join Thousands Who've Transformed Their Betting with Swebets – Spend Just 10 Minutes a Day to Start Winning Big!
        </p>
        <a href="#pricing" className="cta-button bg-red-600 text-white font-bold text-xl py-4 px-10 rounded-lg shadow-xl inline-block">
          Start Winning Today
        </a>
      </div>
    </section>
  )
} 