import type { Metadata } from 'next'
import { fraunces, jakarta } from '@/lib/fonts'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Island Key — Your Island Unlocked',
  description: 'The concierge ecosystem for premium island stays. Partner with us.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Island Key — Your Island Unlocked',
    description: 'The concierge ecosystem for premium island stays.',
    url: 'https://www.islandkey.gr',
    siteName: 'Island Key',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <LenisProvider>
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
