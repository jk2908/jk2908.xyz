import Link from 'next/link'

import { URL } from '#/lib/config'

import { Glitch } from '#/components/glitch'
import { Wrapper } from '#/components/wrapper'

export function Header() {
  return (
    <Wrapper>
      <header className="flex flex-col flex-wrap gap-x-12 gap-y-2 py-8 sm:py-12">
        <Glitch as={Link} className="text-sm" href="/">
          {URL}
        </Glitch>
      </header>
    </Wrapper>
  )
}
