import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

import type { NowPlaying as NowPlayingType, SpotifyResponse } from '#/lib/types'

import { Glitch } from '#/ui/glitch'
import { Heading } from '#/ui/heading'
import { Loader } from '#/ui/loader'
import { Scrollable } from '#/ui/scrollable'

async function getToken() {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
			).toString('base64')}`,
		},
		body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
		cache: 'no-cache',
	})

	return res.json()
}

const offAir = { track: null } satisfies NowPlayingType

async function getNowPlaying(): Promise<NowPlayingType> {
	try {
		const { access_token } = await getToken()
		if (!access_token) return offAir

		const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})

		if (!res.ok || res.status === 204) return offAir
		const { item } = (await res.json()) as SpotifyResponse

		if (!item) return offAir
		const { name, artists } = item

		return {
			track: {
				name,
				artist: artists.map(a => a.name).join(', '),
			},
		}
	} catch (err) {
		return offAir
	}
}

async function Track() {
	noStore()
	const { track } = await getNowPlaying()

	return (
		<Glitch colour="rgb(var(--gr33n-100) / 1)">
			{track ? `${track.name} by ${track.artist}` : 'Off air'}
		</Glitch>
	)
}

const [styles, css, href] = cxx`
	.nowplaying {
		align-items: center;
		display: flex;
		gap: var(--space-2x);
		overflow: hidden;

		> h3 {
			color: rgb(var(--gr33n-100) / 100%);
		}
	}
`

export async function NowPlaying({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx(styles.nowplaying, className)} {...rest}>
			<Heading
				level={3}
				aria-label="Currently playing on Spotify"
				style={{ color: 'rgb(var(--gr33n-100) / 1)', marginBlockEnd: '0px' }}
			>
				s
			</Heading>

			<Scrollable mode="auto" speed={1850 / 60} wait={1000}>
				<Suspense fallback={<Loader />}>
					<Track />
				</Suspense>
			</Scrollable>

			<style href={href} precedence="medium">
        {css}
      </style>
		</div>
	)
}
