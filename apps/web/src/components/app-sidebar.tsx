import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'
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

import { SIDEBAR_ITEMS } from '@/lib/constants'

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5">
          <Image src="/Logo.webp" alt="Docify" width={32} height={32} />
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
                  <SidebarMenuButton render={<Link href={item.href} />}>
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите организацию" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Организация</SelectLabel>
                <SelectItem value="NomaDocs">NomaDocs</SelectItem>
                <SelectItem value="XANSHA">XANSHA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
