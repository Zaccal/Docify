'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@Docify/ui/components/sidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logout } from '@/actions/auth/auth'
import { SIDEBAR_ITEMS } from '@/lib/constants'

import LogoutSubmitButton from './logout-submit-button'
import OrganizationSelect from './organization-select/organization-select'

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5">
          <Image src="/Logo.webp" alt="Docify" width={560} height={630} className="h-auto w-8" />
          <div className="">
            <h1 className="text-lg font-semibold">Docify</h1>
            <p className="text-sm">Генерация документов</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.href === pathname}
                    render={<Link href={item.href} />}
                  >
                    <HugeiconsIcon icon={item.icon} className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="">
          <span className="mb-2 text-xs">Организация</span>
          <OrganizationSelect />
        </div>
        <form action={Logout}>
          <LogoutSubmitButton />
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
