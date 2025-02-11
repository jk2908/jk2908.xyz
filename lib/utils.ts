import { nanoid } from 'nanoid'

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export const id = (l = 15) => nanoid(l)

let c = 0

export function toSmartEscape(e: KeyboardEvent, fn: () => void) {
	if (
		e.key !== 'Escape' ||
		(['TEXTAREA', 'INPUT'].some(t => t === (e?.target as HTMLElement).tagName) && ++c < 2)
	) {
		return
	}

	c = 0
	fn()
}

export const isVisible = (el: HTMLElement) =>
	Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
