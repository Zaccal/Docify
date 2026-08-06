import type { Metadata } from 'next'
import { Geist_Mono, Google_Sans } from 'next/font/google'

import '../index.css'
import Providers from '@/components/providers'

const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  adjustFontFallback: false
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Docify',
  description: 'Docify'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${googleSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
