import type { Metadata } from 'next'

import { DESCRIPTION, ME } from '#/lib/config'

import { Footer } from '#/ui/footer'
import { Header } from '#/ui/header'
import { Move } from '#/ui/move'
import { Providers } from '#/ui/providers'
import { Wrapper } from '#/ui/wrapper'

import '#/app/styles.css'

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
      suppressHydrationWarning>
      <body>
        <Providers>
          <Wrapper>
            <Move>
              <Header />
            </Move>
          </Wrapper>

          <Move style={{ flexGrow: 1, paddingBlock: 'var(--space-8x)' }}>
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
