import React from 'react'

export default function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Swebets</h1>
        <a href="#pricing" className="cta-button bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg">
          Join Now
        </a>
      </div>
    </header>
  )
} 