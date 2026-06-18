import type { UrlObject } from 'url'

import type { IconSvgObject } from '@hugeicons/core-free-icons'

export interface SidebarItem {
  label: string
  icon: IconSvgObject
  href: UrlObject | __next_route_internal_types__.RouteImpl<string>
}
