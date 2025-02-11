'use client'

import {
	useState,
	startTransition,
	unstable_ViewTransition as ViewTransition,
	createContext,
	use,
} from 'react'

import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

import { useKey } from '#/hooks/use-key'
import { useOS } from '#/hooks/use-os'
import { useTheme } from '#/hooks/use-theme'

import { Modal, ModalContent } from '#/ui/modal'
import { Heading } from '#/ui/heading'

export const CmdkContext = createContext<{
	isOpen: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
	isOpen: false,
	setOpen: () => {},
})

export function CmdkProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setOpen] = useState(false)

	return <CmdkContext value={{ isOpen, setOpen }}>{children}</CmdkContext>
}

const [css, styles, href] = cxx`
	.cmdk {
		background-color: rgb(var(--app-bg) / 100%);
		color: rgb(var(--app-fg) / 100%);

		&::backdrop {
			background-color: rgb(0 0 0 / 15%);
			backdrop-filter: blur(4px);
		}
	}

	.close {
		font-size: 14px;
		inset-block-start: 0px;
		inset-inline-end: 0px;
		padding-block: var(--space-2x);
		padding-inline: var(--space-4x);
		position: absolute;
	}

	.heading {
		margin-block-end: var(--space);
	}

	.list {
		list-style-position: inside;

		> li {
		 	padding-inline-start: var(--space-3x);
		}
	}
`

export function Cmdk(props: React.ComponentPropsWithRef<'dialog'>) {
	const { theme, setTheme, themes } = useTheme()
	const { isOpen, setOpen } = use(CmdkContext)

	useKey('k', e => {
		if (!e.metaKey && !e.ctrlKey) return

		e.preventDefault()
		setOpen(p => !p)
	})

	useKey('t', () => {
		startTransition(() => {
			setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])
		})
	})

	return (
		<>
			<Modal isOpen={isOpen} setOpen={setOpen}>
				{({ close }) => (
					<ModalContent className={styles.cmdk} {...props}>
						<button onClick={close} type="button" className={styles.close}>
							[esc]
						</button>

						<article>
							<Heading level={2} className={styles.heading}>
								Theme [t]
							</Heading>

							<ul className={clsx(styles.list)}>
								{themes.map(t => (
									<li key={t}>
										<button onClick={() => setTheme(t)} type="button">
											{t} {t === theme ? '*' : ''}
										</button>
									</li>
								))}
							</ul>
						</article>
					</ModalContent>
				)}
			</Modal>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

export function Shortcut(props: React.ComponentPropsWithRef<'button'>) {
	const os = useOS()
	const { setOpen } = use(CmdkContext)

	return (
		<>
			<button onClick={() => setOpen(true)} type="button" {...props}>
				[{['MAC', 'IOS'].includes(os) ? 'cmd' : 'ctrl'} + k]
			</button>
		</>
	)
}
