import fs from 'fs/promises'
import path from 'path'
import { cache } from 'react'

import type { Post } from '@/lib/types'

type Metadata = {
  title: string
  publishedAt: string
}

function parse(content: string) {
  const regex = /^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/
  const match = content.match(regex)
  const metadata: Partial<Metadata> = {}

  if (!match) {
    throw new Error('Invalid frontmatter')
  }

  let [, frontmatter, body] = match

  frontmatter.split('\n').forEach(line => {
    const [key, value] = line.split(': ').map(str => str.trim())

    metadata[key as keyof Metadata] = value
  })

  return { metadata, body }
}

async function getMdx(dir: string) {
  const files = await fs.readdir(dir)

  return files.filter(file => path.extname(file) === '.mdx')
}

async function readMdx(file: string) {
  return parse(await fs.readFile(file, 'utf-8'))
}

async function createPosts(dir: string) {
  try {
    const files = await getMdx(dir)

    if (!files.length) {
      console.warn(`No posts found in ${dir}`)

      return []
    }

    const posts = await Promise.all(
      files.map(async file => {
        const { metadata, body } = await readMdx(path.join(dir, file))
        const { title, publishedAt } = metadata
        const slug = path.basename(file, path.extname(file))

        if (!title) {
          throw new Error('Post must have a title')
        }

        if (!publishedAt) {
          throw new Error('Post must have a publishedAt date')
        }

        return {
          slug,
          title,
          publishedAt,
          body,
        } satisfies Post
      })
    )

    return posts
  } catch (err) {
    console.error(err)

    return []
  }
}

export const allPosts = cache(async () => await createPosts(path.join(process.cwd(), 'posts')))

export async function onePost(slug: string) {
  const posts = await allPosts()

  return posts.find(post => post.slug === slug)
}
