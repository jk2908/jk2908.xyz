import { allPosts } from 'contentlayer/generated'

import { getPost } from '@/lib/utils'
import Heading from '@/components/heading'
import Wrapper from '@/components/wrapper'

export async function generateStaticParams() {
  return allPosts.map(({ _raw }) => {
    slug: _raw.flattenedPath
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
      <div className="prose" dangerouslySetInnerHTML={{ __html: body.html }}></div>
    </Wrapper>
  )
}
