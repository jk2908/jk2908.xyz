import { redirect } from 'next/navigation'

import { onePost, allPosts } from '#/lib/md'

import { Heading } from '#/ui/heading'
import { Spacer } from '#/ui/spacer'
import { Wrapper } from '#/ui/wrapper'
import { Md } from '#/ui/md'

export const generateStaticParams = async () => allPosts.map(({ slug }) => ({ slug }))

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { title } = onePost((await params).slug) ?? {}

	return !title ? { title: '?' } : { title }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {	
	const p = onePost((await params).slug)

	if (!p) redirect('/')

	return (
		<Wrapper>
			<Heading level={1}>{p.title}</Heading>

			<Spacer>
				<Md>{p.body}</Md>
			</Spacer>

			<Spacer>
				<time dateTime={p.publishedAt} style={{ fontSize: 'var(--text-xs)' }}>
					Published at {p.publishedAt}
				</time>
			</Spacer>
		</Wrapper>
	)
}
