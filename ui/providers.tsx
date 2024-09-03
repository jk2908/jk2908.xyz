'use client'

import { ThemeProvider } from '#/ctx/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
