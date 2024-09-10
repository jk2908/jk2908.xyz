import { Suspense } from 'react'
import type { Metadata } from 'next'

import { ME } from '#/lib/config'

import { Heading } from '#/ui/heading'
import { PostsList } from '#/ui/posts-list'
import { Spacer } from '#/ui/spacer'
import { Wrapper } from '#/ui/wrapper'

export const metadata: Metadata = {
  title: `Home - ${ME}`,
}

export default async function Page() {
  return (
    <Wrapper>
      <Spacer>
        <Heading level={1} className="sr-only">
          Home
        </Heading>

        <p>
          Jerome Kenway is a UI designer &amp; front-end engineer from London.
          Checkout my code on{' '}
          <a className="link" href="https://www.github.com/jk2908">
            Github
          </a>{' '}
          or I&apos;ve written a few things.
        </p>
      </Spacer>

      <Spacer>
        <Heading level={2} className="mb-1 text-sm">
          Writing
        </Heading>

        <Suspense fallback="...">
          <PostsList />
        </Suspense>
      </Spacer>

      <Spacer>
        <Heading level={2} className="mb-1 text-sm">
          Contact
        </Heading>

        <p>
          Connect via email{' '}
          <a className="link" href="mailto:jeromekenway@gmail.com">
            jeromekenway@gmail.com
          </a>
        </p>
      </Spacer>
    </Wrapper>
  )
}
