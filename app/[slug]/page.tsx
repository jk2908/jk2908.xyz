import { redirect } from 'next/navigation'

import { allPosts, onePost } from '#/lib/md'

import { Heading } from '#/ui/heading'
import { Mdx } from '#/ui/mdx'
import { Spacer } from '#/ui/spacer'
import { Wrapper } from '#/ui/wrapper'

export const generateStaticParams = async () => allPosts.map(({ slug }) => slug)

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
			<Heading level={1}>{title}</Heading>

			<Spacer>
				<Mdx source={body} />
			</Spacer>

			<Spacer>
				<time dateTime={publishedAt} style={{ fontSize: 'var(--text-xs)' }}>
					Published at {publishedAt}
				</time>
			</Spacer>
		</Wrapper>
	)
}
