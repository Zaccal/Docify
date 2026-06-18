'use client'

import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'theme'
const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme
  const root = document.documentElement

  root.classList.toggle('dark', resolvedTheme === 'dark')
  root.style.colorScheme = resolvedTheme
}

function getStoredTheme(defaultTheme: Theme): Theme {
  if (typeof window === 'undefined') {
    return defaultTheme
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
    return storedTheme
  }

  return defaultTheme
}

export function ThemeProvider({
  children,
  defaultTheme = 'system'
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = React.useState<Theme>(() => getStoredTheme(defaultTheme))
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
    theme === 'system' ? getSystemTheme() : theme
  )

  React.useEffect(() => {
    const nextResolvedTheme = theme === 'system' ? getSystemTheme() : theme

    applyTheme(theme)
    setResolvedTheme(nextResolvedTheme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  React.useEffect(() => {
    if (theme !== 'system') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const nextResolvedTheme = getSystemTheme()

      applyTheme('system')
      setResolvedTheme(nextResolvedTheme)
    }

    media.addEventListener('change', handleChange)

    return () => media.removeEventListener('change', handleChange)
  }, [theme])

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: setThemeState
    }),
    [resolvedTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
