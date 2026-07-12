import { SidebarProvider, SidebarTrigger } from '@Docify/ui/components/sidebar'
import { Toaster } from '@Docify/ui/components/sonner'

import AppSidebar from '@/components/app-sidebar'
import { CompanySelectProvider } from '@/components/company-select/company-select-store'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <CompanySelectProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </CompanySelectProvider>
  )
}
