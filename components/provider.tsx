'use client'

import { ThemeProvider } from '@/ctx/theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
