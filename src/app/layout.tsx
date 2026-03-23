import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

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
      <body className={`${outfit.variable} ${jakarta.variable} font-sans bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900`}>
        {children}
      </body>
    </html>
  )
}
