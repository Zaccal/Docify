import type { IconSvgObject } from '@hugeicons/core-free-icons'
import type { Route } from 'next'

export interface SidebarItem {
  label: string
  icon: IconSvgObject
  href: Route
}
