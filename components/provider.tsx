'use client'

import { ThemeProvider } from '@/context/theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
