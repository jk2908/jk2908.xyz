import { allPosts, getPost } from '@/lib/mdx'

import { Heading } from '@/components/heading'
import { Wrapper } from '@/components/wrapper'
import { Mdx } from '@/components/mdx'

export async function generateStaticParams() {
  if (!allPosts.length) return

  return allPosts.map(({ slug }) => {
    slug
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { title } = await getPost(params.slug)

  return { title }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { title, body } = await getPost(params.slug)

  return (
    <Wrapper>
      <Heading level={1} className="mb-2 text-sm">
        {title}
      </Heading>
      
      <Mdx source={body} />
    </Wrapper>
  )
}
