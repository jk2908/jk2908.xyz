import { use } from 'react'

import { ThemeContext } from '#/ctx/theme'

export function useTheme() {
	return use(ThemeContext)
}
