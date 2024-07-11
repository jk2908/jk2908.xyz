import Link from 'next/link'

import { URL } from '#/lib/config'

import { Wrapper } from '#/components/wrapper'

export function Header() {
  return (
    <Wrapper>
      <header className="flex flex-col flex-wrap gap-x-12 gap-y-2 py-8 sm:py-12">
        <Link className="text-sm" href="/">
          {URL}
        </Link>
      </header>
    </Wrapper>
  )
}
