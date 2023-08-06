import Wrapper from '@/components/wrapper'
import NowPlaying from '@/components/now-playing'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <Wrapper>
      <footer className="flex justify-between gap-x-8 border-t border-neutral-700 py-4 align-middle text-sm text-neutral-400 overflow-hidden">
        <p className="shrink-0">Copyright {year}</p>
        <NowPlaying />
      </footer>
    </Wrapper>
  )
}
