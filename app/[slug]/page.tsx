import { allPosts, onePost } from '@/lib/mdx'

import { Heading } from '@/components/heading'
import { Mdx } from '@/components/mdx'
import { Wrapper } from '@/components/wrapper'

export async function generateStaticParams() {
  const posts = await allPosts()

  return posts.map(({ slug }) => {
    slug
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await onePost(params.slug)

  if (!post) return

  const { title } = post

  return { title }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await onePost(params.slug)

  if (!post) return

  const { title, body } = post

  return (
    <Wrapper>
      <Heading level={1} className="mb-2 text-sm">
        {title}
      </Heading>

      <Mdx source={body} />
    </Wrapper>
  )
}
