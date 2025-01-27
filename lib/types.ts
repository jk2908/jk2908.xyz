export type SpotifyRes = {
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
  currently_playing_type: string
}

export type Playing = {
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
  ts: number
  updatedAt?: string
  isPrivate?: boolean
  isDraft?: boolean
  body: string
}

export type Theme = 'light' | 'dark' | undefined