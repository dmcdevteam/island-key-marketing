import type { Metadata } from 'next'
import { fraunces, dmSans } from '@/lib/fonts'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.islandkey.gr'),
  title: {
    default: 'Island Key — Your Island Unlocked',
    template: '%s — Island Key',
  },
  description:
    'Island Key is the concierge platform built into your Crete accommodation. Curated experiences, trusted operators, and local expertise — unlocked.',
  keywords: [
    'Crete concierge',
    'Crete experiences',
    'villa concierge Crete',
    'things to do in Crete',
    'Chania activities',
    'luxury travel Crete',
    'island concierge platform',
    'Crete travel guide',
    'private transfers Crete',
    'boat tours Crete',
  ],
  authors: [{ name: 'Island Key', url: 'https://www.islandkey.gr' }],
  creator: 'Island Key',
  publisher: 'Island Key',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.islandkey.gr',
    siteName: 'Island Key',
    title: 'Island Key — Your Island Unlocked',
    description:
      'Curated Crete experiences, transfers, and local experts — unlocked from your accommodation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Island Key — Your Island Unlocked',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Island Key — Your Island Unlocked',
    description:
      'Curated Crete experiences, transfers, and local experts — unlocked from your accommodation.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.islandkey.gr',
  },
  verification: {
    google: 'bO8KXrdl9YDkYVRI3f-MDE2Lu_lL8-Eot2tWypFq_eg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Island Key',
              url: 'https://www.islandkey.gr',
              logo: 'https://www.islandkey.gr/logo.svg',
              description:
                'Island Key is a concierge platform connecting guests at premium Crete properties to curated local experiences and trusted operators.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Chania',
                addressRegion: 'Crete',
                addressCountry: 'GR',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'partnerships',
                email: 'hello@islandkey.gr',
              },
              sameAs: [],
            }),
          }}
        />
        <LenisProvider>
          <Nav />
          {children}
        </LenisProvider>
        <GoogleAnalytics gaId="G-KJFBK0XS0Z" />
      </body>
    </html>
  )
}
