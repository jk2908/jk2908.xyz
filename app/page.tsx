import { Metadata } from 'next'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

import { ME } from '@/lib/config'
import Heading from '@/components/heading'
import Spacer from '@/components/spacer'
import Wrapper from '@/components/wrapper'

export const metadata: Metadata = {
  title: 'Home - ' + ME,
}

export default async function Page() {
  return (
    <Wrapper>
      <Spacer>
        <Heading level={1} className="sr-only">
          Home
        </Heading>

        <p>
          Jerome Kenway is a UI designer x front-end engineer from London. Checkout my code on{' '}
          <a className="link" href="https://www.github.com/jk2908">
            Github
          </a>{' '}
          or I&apos;ve written a few things.
        </p>
      </Spacer>

      <Spacer>
        <Heading level={2} className="mb-2 text-sm">
          Writing
        </Heading>

        {allPosts.length ? (
          allPosts.map(({ title, url }) => (
            <div key={url}>
              <Link href={url}>{title}</Link>
            </div>
          ))
        ) : (
          <>My bad, I haven&apos;t written anything yet.</>
        )}
      </Spacer>

      <Spacer>
        <Heading level={2} className="mb-2 text-sm">
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
