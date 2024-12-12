import type { Metadata } from 'next'

import { cxx } from '@jk2908/cxx'

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

const [css, , href] = cxx`
  :global(._) {
    display: flex;
		flex-wrap: wrap;
		gap: var(--wrapper-px);
		padding-block: var(--wrapper-px);
  }

	:global(.h) {
		flex: 1 0 auto;
		max-inline-size: 135px;
	}

	:global(.m) {
		flex: 1 1 60ch;
		max-inline-size: 60ch;
	}

	:global(.f) {
		background-color: rgb(var(--app-bg) / 100%);
		display: flex;
		inline-size: 175px;
		inset-block-end: var(--wrapper-px);
		inset-inline-end: var(--wrapper-px);
		justify-content: flex-end;
		position: fixed;
	}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<html lang="en" dir="ltr" suppressHydrationWarning>
				<body>
					<Providers>
						<Wrapper className="_">
							<Move className="h">
								<Header />
							</Move>

							<Move className="m">
								<main>{children}</main>
							</Move>

							<Move className="f">
								<Footer />
							</Move>
						</Wrapper>
					</Providers>
				</body>
			</html>

			<style precedence="medium" href={href}>
				{css}
			</style>
		</>
	)
}
