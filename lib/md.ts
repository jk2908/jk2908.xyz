import fs from 'node:fs/promises'
import path from 'node:path'

import type { Post } from '#/lib/types'

type Metadata = Omit<Post, 'slug' | 'ts' | 'body' | 'isPrivate' | 'isDraft'> & {
	isPrivate?: string
	isDraft?: string
}

function parse(content: string) {
	const regex = /^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/
	const match = content.match(regex)
	const metadata: Partial<Metadata> = {}

	if (!match) throw new Error('Invalid frontmatter')

	const [, frontmatter, body] = match

	if (frontmatter) {
		for (const line of frontmatter.split('\n')) {
			const [key, value] = line.split(': ').map(str => str.trim())
			metadata[key as keyof Metadata] = value
		}
	}

	return { metadata, body }
}

async function create(dir: string) {
	try {
		const files = (await fs.readdir(dir)).filter(file => path.extname(file) === '.md')

		if (!files.length) {
			console.warn(`No posts found in ${dir}`)
			return []
		}

		const posts = await Promise.all(
			files.map(async f => {
				const { metadata, body } = parse(await fs.readFile(path.join(dir, f), 'utf-8'))
				const { title, publishedAt, isPrivate, isDraft, ...rest } = metadata
				const slug = path.basename(f, path.extname(f))

				if (!title) throw new Error('Post must have a title')
				if (!publishedAt) throw new Error('Post must have a publishedAt date')

				return {
					slug,
					title,
					publishedAt,
					ts: new Date(publishedAt).getTime(),
					isPrivate: isPrivate === 'true',
					isDraft: isDraft === 'true',
					body,
					...rest,
				} satisfies Post
			}),
		)

		return posts
	} catch (err) {
		console.error(err)
		return []
	}
}

export const allPosts = await create(path.join(process.cwd(), 'posts'))
export const onePost = (id: string) => allPosts.find(p => p.slug === id)
