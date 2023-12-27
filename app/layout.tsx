import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'

import { DESCRIPTION, ME } from '@/lib/config'
import { cn } from '@/lib/utils'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Provider } from '@/components/provider'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: ME,
    template: `%s - ${ME}`,
  },
  description: DESCRIPTION,
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
    {
      rel: 'android-chrome',
      type: 'image/png',
      sizes: '192x192',
      url: '/android-chrome-192x192.png',
    },
    {
      rel: 'android-chrome',
      type: 'image/png',
      sizes: '512x512',
      url: '/android-chrome-512x512.png',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn('h-full font-mono', GeistMono.variable)}
      suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-app-bg tracking-wide text-app-text selection:bg-gr33n">
        <Provider>
          <Header />
          <main className="grow py-8 sm:py-12">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
