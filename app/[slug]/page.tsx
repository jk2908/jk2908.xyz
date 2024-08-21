import { redirect } from 'next/navigation'

import { allPosts, onePost } from '#/lib/md'

import { Heading } from '#/components/heading'
import { Mdx } from '#/components/mdx'
import { Spacer } from '#/components/spacer'
import { Wrapper } from '#/components/wrapper'

export const generateStaticParams = async () => {
	return allPosts.map(({ slug }) => slug)
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const p = await onePost(params.slug)

	if (!p) return

	return { title: p.title }
}

export default async function Page({ params }: { params: { slug: string } }) {
	const p = await onePost(params.slug)

	if (!p) redirect('/')

	const { title, body, publishedAt } = p

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
					Published at {publishedAt}
				</time>
			</Spacer>
		</Wrapper>
	)
}
