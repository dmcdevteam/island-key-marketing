import { Fraunces, DM_Sans } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})
