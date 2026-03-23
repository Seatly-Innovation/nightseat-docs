import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NightSeat Innovation Docs',
  description: 'Official documentation for the NightSeat Innovation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-sky-900`}>
        {children}
      </body>
    </html>
  )
}
