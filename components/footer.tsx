import { NowPlaying } from '#/components/now-playing'
import { Wrapper } from '#/components/wrapper'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Wrapper>
      <footer className="flex justify-between gap-x-8 overflow-hidden border-t border-keyline py-4 align-middle text-sm">
        <p className="shrink-0">Copyright {year}</p>

        <NowPlaying />
      </footer>
    </Wrapper>
  )
}
