'use client'

import {
	createContext,
	useCallback,
	useRef,
	use,
	startTransition,
	useLayoutEffect,
} from 'react'

import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'
import { mergeRefs } from 'react-merge-refs'

import { toSmartEscape } from '#/lib/utils'

import { useFocusScope } from '#/hooks/use-focus-scope'
import { useKey } from '#/hooks/use-key'
import { useClickOutside } from '#/hooks/use-click-outside'

const [css, styles, href] = cxx`
  :where(.content) {
    background-color: rgb(var(--app-bg) / 100%);
		border: none;
    inline-size: min(calc(100vi - (var(--wrapper-px, 2rem) * 2)), 30rem);
    margin-block: auto;
    margin-inline: auto;
    padding-block: var(--Modal-py, var(--space-4x));
    padding-inline: var(--Modal-px, var(--space-6x));
  }
`

type RenderProps = {
	isOpen: boolean
	open: () => void
	close: () => void
	toggle: () => void
}

type Trigger = HTMLElement | null

type Props = {
	children: React.ReactNode | ((props: RenderProps) => React.ReactNode)
	isOpen: boolean
	setOpen: (v: boolean) => void
	onClose?: () => Promise<void> | void
	isDismissable?: boolean
	trigger?: Trigger
	type?: 'modal' | 'non-modal'
}

const ModalContext = createContext<
	{
		modal: React.RefObject<HTMLDialogElement | null>
		isDismissable: boolean
	} & RenderProps
>({
	isOpen: false,
	open: () => {},
	close: () => {},
	toggle: () => {},
	modal: { current: null },
	isDismissable: true,
})

export function Modal({
	children,
	isOpen,
	setOpen,
	onClose,
	isDismissable = true,
	type = 'modal',
}: Props) {
	const modal = useRef<HTMLDialogElement>(null)
	const trigger = useRef<Trigger>(null)

	const open = useCallback(() => {
		trigger.current ??= document.activeElement as HTMLElement

		startTransition(() => {
			setOpen(true)
		})
	}, [setOpen])

	const close = useCallback(() => {
		startTransition(() => {
			setOpen(false)
		})

		onClose?.()
		trigger.current?.focus()
	}, [setOpen, onClose])

	const toggle = useCallback(() => {
		isOpen ? close() : open()
	}, [isOpen, open, close])

	useLayoutEffect(() => {
		if (isOpen) {
			modal.current?.[type === 'modal' ? 'showModal' : 'show']()
		} else {
			modal.current?.close()
		}
	}, [isOpen, type])

	return (
		<ModalContext value={{ isOpen, open, close, toggle, modal, isDismissable }}>
			{typeof children === 'function'
				? children({ isOpen, open, close, toggle })
				: children}

			<style precedence="medium" href={href}>
				{css}
			</style>
		</ModalContext>
	)
}

export function ModalContent({
	ref,
	children,
	className,
	...rest
}: React.ComponentPropsWithRef<'dialog'>) {
	const { isOpen, close, modal, isDismissable } = use(ModalContext)

	useFocusScope(modal, { when: isOpen })
	useClickOutside(modal, close, { when: isOpen && isDismissable, measure: true })

	useKey(
		'Escape',
		e => {
			toSmartEscape(e, close)
		},
		{ when: isOpen && isDismissable },
	)

	if (!isOpen) return null

	return (
		<dialog
			ref={mergeRefs([ref, modal])}
			className={clsx(styles.content, className)}
			{...rest}>
			{children}
		</dialog>
	)
}
