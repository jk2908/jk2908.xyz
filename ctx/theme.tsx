import { createContext, memo, useEffect, useState, useCallback } from 'react'

const themes = ['blue', 'mono', 'gr33n'] as const

export type Theme = (typeof themes)[number]

export const ThemeContext = createContext<{
	theme: Theme
	setTheme: (t: Theme) => void
	themes: typeof themes
}>({
	theme: 'blue',
	setTheme: () => {},
	themes,
})

const s =
	'!function(){var e=localStorage.theme??(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"blue");document.documentElement.dataset.theme=e}()'

export const Script = memo(() => (
	// biome-ignore lint/security/noDangerouslySetInnerHtml: shh
	<script dangerouslySetInnerHTML={{ __html: s }} />
))

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('blue')

	useEffect(() => {
		setTheme(document.documentElement.dataset.theme as Theme)
	}, [])

	const handler = useCallback((t: Theme) => {
		setTheme(t)
		localStorage.theme = t
		document.documentElement.dataset.theme = t
	}, [])

	return (
		<ThemeContext value={{ theme, setTheme: handler, themes }}>
			<Script />

			{children}
		</ThemeContext>
	)
}
