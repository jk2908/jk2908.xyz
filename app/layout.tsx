import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'

import { DESCRIPTION, ME } from '@/lib/config'
import { cn } from '@/lib/utils'
import Footer from '@/components/footer'
import Header from '@/components/header'

import '@/styles/globals.css'

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  style: 'normal',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: ME,
    template: '%s - ' + ME,
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

export const runtime = 'edge'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={cn('h-full font-mono', mono.variable)}>
      <body className="flex min-h-full flex-col bg-app-bg tracking-wider text-neutral-100 selection:bg-gr33n selection:text-app-bg">
        <Header />
        <main className="grow py-8 sm:py-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
