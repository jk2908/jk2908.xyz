import { Suspense, useId } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

import type { NowPlaying, SpotifyResponse } from '#/lib/types'

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

  return track ? (
    <Glitch>
      {track.name} by ${track.artist}
    </Glitch>
  ) : (
    'Off air'
  )
}

export async function NowPlaying(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Heading level={3} aria-label="Currently playing on Spotify">
        s
      </Heading>

      <Scrollable mode="auto" speed={1850 / 60} wait={1000}>
        <Suspense fallback={<Loader />}>
          <Track />
        </Suspense>
      </Scrollable>

      <style>
        {`
          @scope {
            :scope {
              align-items: center;
              display: flex;
              gap: var(--space-2x);
              overflow: hidden;
            }

            > h3 {
              color: rgb(var(--gr33n-100) / 100%);
            }
          }
        `}
      </style>
    </div>
  )
}
