import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

import type { NowPlaying, SpotifyResponse } from '@/lib/types'

import { Heading } from '@/components/heading'
import { Scrollable } from '@/components/scrollable'

async function getAccessToken() {
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
    const { access_token } = await getAccessToken()
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
        artist: artists.map(({ name }) => name).join(', '),
      },
    }
  } catch (err) {
    throw err
  }
}

async function Track() {
  noStore()
  const { track } = await getNowPlaying()

  return track ? `${track.name} by ${track.artist}` : 'Off air'
}

export async function NowPlaying() {
  const prefix = (
    <Heading level={3} className="text-gr33n" aria-label="Currently playing on Spotify">
      s
    </Heading>
  )

  return (
    <div className="flex items-baseline gap-2 overflow-x-hidden">
      {prefix}

      <Scrollable>
        <Suspense fallback="...">
          <Track />
        </Suspense>
      </Scrollable>
    </div>
  )
}
