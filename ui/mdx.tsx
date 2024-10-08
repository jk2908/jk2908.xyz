import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { Heading } from '#/ui/heading'
import { Spacer } from '#/ui/spacer'

function P({ children }: { children?: React.ReactNode }) {
	return (
		<Spacer>
			<p>{children}</p>
		</Spacer>
	)
}

function H2({ children }: { children?: React.ReactNode }) {
	return <Heading level={2}>{children}</Heading>
}

function A({
	children,
	href,
	...rest
}: {
	children?: React.ReactNode
} & React.ComponentPropsWithRef<'a'>) {
	const c = 'link'

	if (href?.startsWith('/')) {
		return (
			<Link href={href} className={c} {...rest}>
				{children}
			</Link>
		)
	}

	const e = !href?.startsWith('#') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

	return (
		<a href={href} className={c} {...e} {...rest}>
			{children}
		</a>
	)
}

function Ul({ children }: { children?: React.ReactNode }) {
	return (
		<Spacer>
			<ul className="body-list">{children}</ul>
		</Spacer>
	)
}

export function Mdx({ source }: { source: string }) {
	return <MDXRemote source={source} components={{ p: P, h2: H2, a: A, ul: Ul }} />
}
