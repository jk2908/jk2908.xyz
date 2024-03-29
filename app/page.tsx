import { Metadata } from 'next'
import Link from 'next/link'

import { ME } from '@/lib/config'
import { allPosts } from '@/lib/mdx'

import { Heading } from '@/components/heading'
import { Spacer } from '@/components/spacer'
import { Wrapper } from '@/components/wrapper'

export const metadata: Metadata = {
  title: 'Home - ' + ME,
}

export default async function Page() {
  const posts = await allPosts()

  return (
    <Wrapper>
      <Spacer>
        <Heading level={1} className="sr-only">
          Home
        </Heading>

        <p>
          Jerome Kenway is a UI designer &amp; front-end engineer from London. Checkout my code on{' '}
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

        {!allPosts.length ? (
          "My bad, I haven't written anything yet."
        ) : (
          <ol className="flex flex-col">
            {posts.map(({ title, slug }) => (
              <Link href={`/${slug}`} key={slug}>
                {title}
              </Link>
            ))}
          </ol>
        )}
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
