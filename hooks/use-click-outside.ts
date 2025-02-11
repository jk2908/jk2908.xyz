import { useEffect, useMemo } from 'react'

type Config = {
	when: boolean | undefined
	type: 'click' | 'dblclick'
	measure?: boolean
}

const DEFAULT_CONFIG: Config = {
	when: undefined,
	type: 'click',
	measure: false,
} as const

export function useClickOutside(
	ref: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement | null>[],
	onClick: (e: MouseEvent) => void,
	config: Partial<Config> = {},
) {
	const { when, type, measure } = useMemo(
		() => ({ ...DEFAULT_CONFIG, ...config }),
		[config],
	)

	useEffect(() => {
		if (when === false) return

		function handler(e: MouseEvent) {
			const target = e.target as HTMLElement
			const refs = Array.isArray(ref) ? ref : [ref]

			if (measure && refs.length > 1) {
				throw new Error('measure can only be used with a single ref')
			}

			if (measure) {
				const r = refs[0]
				const rect = r.current?.getBoundingClientRect()

				if (!rect) return

				const { top, right, bottom, left } = rect

				if (
					e.clientX >= left &&
					e.clientX <= right &&
					e.clientY >= top &&
					e.clientY <= bottom
				) {
					return
				}

				return onClick(e)
			}

			if (!refs.some(r => r.current?.contains(target) || target === r.current)) {
				return onClick(e)
			}
		}

		document.addEventListener(type, handler)

		return () => {
			document.removeEventListener(type, handler)
		}
	}, [ref, onClick, when, type, measure])
}
