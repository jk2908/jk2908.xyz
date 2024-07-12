import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

import type { NowPlaying, SpotifyResponse } from '#/lib/types'
import { cn } from '#/lib/utils'

import { Glitch } from '#/components/glitch'
import { Heading } from '#/components/heading'
import { Loader } from '#/components/loader'
import { Scrollable } from '#/components/scrollable'

async function getToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
    cache: 'no-cache',
  })

  return res.json()
}

const offAir = { track: null } satisfies NowPlaying

async function getNowPlaying(): Promise<NowPlaying> {
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

  return track ? `${track.name} by ${track.artist}` : 'Off air'
}

export async function NowPlaying({ className }: { className?: string }) {
  const prefix = (
    <Heading level={3} className="text-gr33n" aria-label="Currently playing on Spotify">
      s
    </Heading>
  )

  return (
    <div className={cn('flex items-baseline gap-2 overflow-x-hidden', className)}>
      {prefix}

      <Scrollable mode="auto" speed={1850 / 60} wait={1000}>
        <Suspense fallback={<Loader />}>
          <Glitch>
            <Track />
          </Glitch>
        </Suspense>
      </Scrollable>
    </div>
  )
}
