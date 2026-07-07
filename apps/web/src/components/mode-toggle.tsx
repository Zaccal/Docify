'use client'

import { Switch } from '@Docify/ui/components/switch'

import { useTheme } from './theme-provider'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <Switch
        size="lg"
        defaultChecked={theme === 'dark'}
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    </>
  )
}
