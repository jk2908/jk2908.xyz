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

const offAir = { live: false, track: null } satisfies NowPlaying

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

    if (!res.ok || res.status === 204) {
      return offAir
    }

    const {
      item: { name, artists, album, external_urls },
    } = (await res.json()) as SpotifyResponse

    return {
      live: true,
      track: {
        name,
        artist: artists.map(({ name }) => name).join(', '),
        album: album.images[0].url,
        image: album.images[0].url,
        url: external_urls.spotify,
      },
    }
  } catch (err) {
    return offAir
  }
}

export async function NowPlaying() {
  const { live, track } = await getNowPlaying()

  const prefix = (
    <Heading level={3} className="text-gr33n" aria-label="Currently playing on Spotify">
      s
    </Heading>
  )

  return (
    <div className="flex items-baseline gap-2 overflow-x-hidden">
      {prefix}
      <Scrollable>{live ? track?.name + ' by ' + track?.artist : 'Off air'}</Scrollable>
    </div>
  )
}
