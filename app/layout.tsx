import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-gray-300`}>
        {children}
      </body>
    </html>
  )
} 