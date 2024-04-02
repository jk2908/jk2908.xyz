import Link from 'next/link'

import { allPosts } from '@/lib/md'

export async function PostsList() {
  const posts = (await allPosts()).filter(p => !p.isPrivate)

  if (!posts.length) return <p>My bad, I haven&apos;t written anything public yet.</p>

  return posts.map(({ slug, title }) => (
    <div key={slug}>
      <Link href={`/${slug}`}>{title}</Link>
    </div>
  ))
}
