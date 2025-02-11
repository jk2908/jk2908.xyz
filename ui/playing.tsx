import { Suspense } from 'react'

import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

import type { Playing as TPlaying, SpotifyRes } from '#/lib/types'

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

const offAir = { track: null } satisfies TPlaying

async function getPlaying(): Promise<TPlaying> {
	try {
		const { access_token } = await getToken()
		if (!access_token) return offAir

		const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})

		if (!res.ok) return offAir

		const { item }: SpotifyRes = await res.json()

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
	const { track } = await getPlaying()

	return (
		<Glitch colour="rgb(var(--gr33n) / 1)">
			{track ? `${track.name} by ${track.artist}` : 'Off air'}
		</Glitch>
	)
}

const [css, styles, href] = cxx`
	.playing {
		align-items: center;
		display: flex;
		gap: var(--space-2x);
		overflow: hidden;

		> h3 {
			color: rgb(var(--gr33n) / 100%);
		}
	}
`

export async function Playing({ className, ...rest }: React.ComponentPropsWithRef<'div'>) {
	return (
		<div className={clsx(styles.playing, className)} {...rest}>
			<Heading
				level={3}
				aria-label="Currently playing on Spotify"
				style={{ color: 'rgb(var(--gr33n) / 1)', marginBlockEnd: '0px' }}>
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
