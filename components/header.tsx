import Link from 'next/link'

import { SITE } from '@/lib/config'
import Wrapper from '@/components/wrapper'
import Glitch from '@/components/glitch'

export default function Header() {
  return (
    <Wrapper>
      <header className="flex flex-wrap items-center justify-between gap-x-12 gap-y-2 py-8 sm:py-12">
        <Glitch as={Link} href="/">
          {SITE}
        </Glitch>
      </header>
    </Wrapper>
  )
}
