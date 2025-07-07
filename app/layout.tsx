import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Swebets - Turn Your Sports Betting Into Consistent Wins',
  description: 'Join Thousands Who\'ve Transformed Their Betting with Swebets – Spend Just 10 Minutes a Day to Start Winning Big!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-gray-300`}>
        {children}
      </body>
    </html>
  )
} 