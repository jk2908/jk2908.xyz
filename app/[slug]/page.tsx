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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const p = onePost(slug)

	if (!p) redirect('/')

	return (
		<Wrapper>
			<Heading level={1}>{p.title}</Heading>

			<Spacer>
				<Mdx source={p.body} />
			</Spacer>

			<Spacer>
				<time dateTime={p.publishedAt} style={{ fontSize: 'var(--text-xs)' }}>
					Published at {p.publishedAt}
				</time>
			</Spacer>
		</Wrapper>
	)
}
