import NowPlaying from '@/components/now-playing'
import Wrapper from '@/components/wrapper'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Wrapper>
      <footer className="flex justify-between gap-x-8 overflow-hidden border-t border-neutral-700 py-4 align-middle text-sm text-neutral-400">
        <p className="shrink-0">Copyright {year}</p>
        <NowPlaying />
      </footer>
    </Wrapper>
  )
}
