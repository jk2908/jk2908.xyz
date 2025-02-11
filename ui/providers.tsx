'use client'

import { ThemeProvider } from '#/ctx/theme'
import { CmdkProvider } from '#/ui/cmd-k'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<CmdkProvider>{children}</CmdkProvider>
		</ThemeProvider>
	)
}
