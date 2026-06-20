import type { Home01Icon } from '@hugeicons/core-free-icons'
import type { Route } from 'next'

export interface SidebarItem {
  label: string
  icon: typeof Home01Icon
  href: Route
}
