import { createContext, memo, useEffect, useState } from 'react'

import type { Theme } from '@/lib/types'

export const ThemeContext = createContext<Theme>(undefined)

const s = `!function(){var e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=e}()`

const Script = memo(function Script() {
  return <script dangerouslySetInnerHTML={{ __html: s }} />
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(undefined)

  useEffect(() => {
    const t = document.documentElement.dataset.theme as Theme

    if (!theme) {
      setTheme(t)

      return
    }

    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    function handler({ matches }: MediaQueryListEvent) {
      setTheme(matches ? 'dark' : 'light')

      console.log('Handler invoked', matches)
    }

    mq.addEventListener('change', handler)

    return () => {
      mq.removeEventListener('change', handler)
    }
  })

  return (
    <ThemeContext.Provider value={theme}>
      <Script />
      {children}
    </ThemeContext.Provider>
  )
}
