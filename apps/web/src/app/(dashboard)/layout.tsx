import { SidebarProvider, SidebarTrigger } from '@Docify/ui/components/sidebar'
import { Skeleton } from '@Docify/ui/components/skeleton'
import { Toaster } from '@Docify/ui/components/sonner'
import { Suspense } from 'react'

import AppSidebar from '@/components/app-shell/app-sidebar/app-sidebar'
import { CompanySelectProvider } from '@/components/company-select/company-select-store'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <CompanySelectProvider>
      <SidebarProvider>
        <Suspense fallback={<Skeleton className="mr-4 h-screen w-sm rounded-none" />}>
          <AppSidebar />
        </Suspense>
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </CompanySelectProvider>
  )
}
