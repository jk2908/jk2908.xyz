import fs from 'fs'
import path from 'path'
import { cache } from 'react'

import type { Post } from '@/lib/types'

type Metadata = {
  title: string
  publishedAt: string
}

function parseFrontmatter(content: string) {
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

function getMdxFiles(dir: string) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMdxFile(file: string) {
  return parseFrontmatter(fs.readFileSync(file, 'utf-8'))
}

function createPosts(dir: string) {
  const files = getMdxFiles(dir)

  if (!files.length) {
    console.warn('No posts found')

    return []
  }

  return files.map(file => {
    const { metadata, body } = readMdxFile(path.join(dir, file))
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
}

const getPosts = cache(async () => {
  const posts = createPosts(path.join(process.cwd(), 'posts'))

  return posts.length ? posts : []
})

export const allPosts = await getPosts()
export const getPost = async (slug: string) => allPosts.find(post => post.slug === slug) as Post
