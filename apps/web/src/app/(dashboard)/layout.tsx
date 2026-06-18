import { SidebarProvider, SidebarTrigger } from '@Docify/ui/components/sidebar'

import AppSidebar from '@/components/app-sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
