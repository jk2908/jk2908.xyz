import Link from 'next/link'

import Markdown from 'react-markdown'
import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import { Heading } from '#/ui/heading'

const [css, styles, href] = cxx`
	.mdp, .mdul {
		:is(&, ul) + & {
			margin-block-start: var(--spacer-sm);
		}
	}

	.mdh2 {
		:is(p, ul, h2, h3, h4, h5, h6) + &  {
			margin-block-start: var(--spacer);
		}
	}
`

function P({ children }: { children?: React.ReactNode }) {
	return <p className={styles.mdp}>{children}</p>
}

function H2({ children }: { children?: React.ReactNode }) {
	return (
		<Heading level={2} className={styles.mdh2}>
			{children}
		</Heading>
	)
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
	return <ul className={clsx('body-list', styles.mdul)}>{children}</ul>
}

export function Md({ children }: { children: string }) {
	return (
		<>
			<Markdown components={{ p: P, h2: H2, a: A, ul: Ul }}>{children}</Markdown>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}
