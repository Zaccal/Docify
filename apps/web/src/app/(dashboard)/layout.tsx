import { SidebarProvider, SidebarTrigger } from '@Docify/ui/components/sidebar'

import AppSidebar from '@/components/app-sidebar'
import { OrganizationSelectProvider } from '@/components/organization-select/organization-select-store'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <OrganizationSelectProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </OrganizationSelectProvider>
  )
}
