import { redirect } from 'next/navigation'

import { allPosts, onePost } from '#/lib/md'

import { Heading } from '#/components/heading'
import { Mdx } from '#/components/mdx'
import { Spacer } from '#/components/spacer'
import { Wrapper } from '#/components/wrapper'

export const generateStaticParams = async () => (
  allPosts.map(({ slug }) => {
    slug
  })
)

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await onePost(params.slug)

  if (!post) return

  const { title } = post

  return { title }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await onePost(params.slug)

  if (!post) redirect('/')

  const { title, body, publishedAt } = post

  return (
    <Wrapper>
      <Heading level={1} className="mb-2 text-sm">
        {title}
      </Heading>

      <Spacer>
        <Mdx source={body} />
      </Spacer>

      <Spacer>
        <time className="text-xs" dateTime={publishedAt}>
          Published on {publishedAt}
        </time>
      </Spacer>
    </Wrapper>
  )
}
