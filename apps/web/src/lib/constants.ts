import { DocumentAttachmentIcon, Home01Icon, User02Icon } from '@hugeicons/core-free-icons'

import type { SidebarItem } from '@/types/sidebar-items.type'

export const COOKIE_NAME = 'auth'

export const PUBLIC_ROUTES = ['/']

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Главная',
    icon: Home01Icon,
    href: '/dashboard'
  },
  {
    label: 'Документы',
    icon: DocumentAttachmentIcon,
    href: '/documents'
  },
  {
    label: 'Клиенты',
    icon: User02Icon,
    href: '/customers'
  }
]
