import { createContext, memo, useEffect, useState, useCallback } from 'react'

export type Theme = 'default' | 'green'

export const ThemeContext = createContext({
	theme: 'light',
	setTheme: (t: Theme) => {},
})

const s =
	'!function(){var e=localStorage.theme??(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=e}()'

export const Script = memo(() => (
	// biome-ignore lint/security/noDangerouslySetInnerHtml: shh
	<script dangerouslySetInnerHTML={{ __html: s }} />
))

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('default')

	useEffect(() => {
		setTheme(document.documentElement.dataset.theme as Theme)
	}, [])

	const handler = useCallback((t: Theme) => {
		setTheme(t)
		localStorage.theme = t
		document.documentElement.dataset.theme = t
	}, [])

	return (
		<ThemeContext value={{ theme, setTheme: handler }}>
			<Script />

			{children}
		</ThemeContext>
	)
}
