import type { Metadata } from 'next'

import { DESCRIPTION, ME } from '#/lib/config'

import { Footer } from '#/components/footer'
import { Header } from '#/components/header'
import { Move } from '#/components/move'
import { Providers } from '#/components/providers'
import { Wrapper } from '#/components/wrapper'

import '#/styles/globals.css'

export const experimental_ppr = true

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
      className="h-full overflow-x-hidden font-mono"
      suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-app-bg tracking-wider text-app-fg selection:bg-gr33n">
        <Providers>
          <Wrapper>
            <Move>
              <Header />
            </Move>
          </Wrapper>

          <Move className="grow py-8 sm:py-12">
            <main>{children}</main>
          </Move>

          <Wrapper>
            <Move>
              <Footer />
            </Move>
          </Wrapper>
        </Providers>
      </body>
    </html>
  )
}
