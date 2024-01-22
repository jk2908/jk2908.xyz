export type SpotifyResponse = {
  is_playing: boolean
  progress_ms: number
  item: {
    name: string
    external_urls: {
      spotify: string
    }
    duration_ms: number
    artists: {
      name: string
    }[]
    album: {
      images: {
        url: string
      }[]
    }
  }
}

export type NowPlaying = {
  track: {
    name: string
    artist: string
    album?: string
    image?: string
    url?: string
  } | null
}

export type Post = {
  title: string
  slug: string
  publishedAt: string
  body: string
}

export type Theme = 'light' | 'dark' | undefined