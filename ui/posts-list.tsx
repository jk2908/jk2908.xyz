import Link from 'next/link'

import { allPosts } from '#/lib/md'

export function PostsList(props: React.ComponentPropsWithRef<'ul'>) {
  const posts = allPosts.filter(p => !p.isPrivate)

  if (!posts.length) return <p>My bad, I haven&apos;t written anything public yet.</p>

  return (
    <ul {...props}>
      {posts.map(p => (
        <li key={p.slug}>
          <Link href={`/${p.slug}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  )
}
