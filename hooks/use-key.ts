import { useEffect, useState, useCallback, useMemo } from 'react'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

type Key = KeyboardEvent['key']
type Combo = string // @todo: improve typing

type Config = {
	when: boolean
	repeat: boolean
	on: 'keydown' | 'keyup'
	ignore: Key[]
	casing: 'relaxed' | 'strict'
	mods: 'relaxed' | 'strict'
}

const ALIASES: Record<string, string> = {
	Space: ' ',
	Ctrl: 'Control',
	'^': 'Control',
	Cmd: 'Meta',
	Win: 'Meta',
	'⌘': 'Meta',
	Del: 'Delete',
	Esc: 'Escape',
	Up: 'ArrowUp',
	Down: 'ArrowDown',
	Left: 'ArrowLeft',
	Right: 'ArrowRight',
	Ins: 'Insert',
	Shift: 'Shift',
} as const

const MODS = ['Alt', 'Ctrl', 'Meta', 'Shift'] as const

const DEFAULT_CONFIG: Config = {
	when: true,
	repeat: false,
	on: 'keydown',
	ignore: [],
	casing: 'relaxed',
	mods: 'relaxed',
} as const

function parse(combo: Combo) {
	return combo
		.replace(/\s+/g, '')
		.split(/(?<!\\)\+(?!$)/)
		.map(k => {
			k = k.trim().replace(/\\\+/g, '+')

			return (
				ALIASES[k] ??
				Object.fromEntries(Object.entries(ALIASES).map(([k, v]) => [k.toLowerCase(), v]))[
					k
				] ??
				k
			)
		})
}

export function useKey(
	combo: Key | Combo,
	fn: (e: KeyboardEvent, pressed: Key[]) => void,
	config: Partial<Config> = {},
) {
	const { when, repeat, on, ignore, casing, mods } = useMemo(
		() => ({ ...DEFAULT_CONFIG, ...config }),
		[config],
	)

	const keys = useMemo(() => parse(combo), [combo])
	const [pressed, setPressed] = useState<Set<Key>>(new Set())

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (when === false || (e.repeat && repeat === false)) return

			const key =
				casing === 'relaxed' && ALPHABET.includes(e.key) ? e.key.toLowerCase() : e.key

			setPressed(p => (ignore.includes(key) ? p : new Set([...p, key])))

			if (on === 'keydown') {
				const arr =
					mods === 'relaxed'
						? [...pressed, key].filter(k => !MODS.map(m => ALIASES[m]).includes(k))
						: [...pressed, key]

				if (keys.length === arr.length && keys.every(k => arr.includes(k))) {
					fn(e, arr)
				}
			}
		},
		[when, repeat, on, keys, pressed, fn, ignore, casing, mods],
	)

	const onKeyUp = useCallback(
		(e: KeyboardEvent) => {
			if (when === false) return

			const key =
				casing === 'relaxed' && ALPHABET.includes(e.key) ? e.key.toLowerCase() : e.key

			setPressed(p => {
				p.delete(key)
				return new Set(p)
			})

			if (on === 'keyup') {
				const arr =
					mods === 'relaxed'
						? [...pressed].filter(k => !MODS.map(m => ALIASES[m]).includes(k))
						: [...pressed]

				if (keys.length === arr.length && keys.every(k => arr.includes(k))) {
					fn(e, arr)
				}
			}
		},
		[when, on, keys, pressed, fn, casing, mods],
	)

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('keyup', onKeyUp)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('keyup', onKeyUp)
		}
	}, [onKeyDown, onKeyUp])

	return { pressed }
}
