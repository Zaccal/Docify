import { Skeleton } from '@Docify/ui/components/skeleton'
import { Suspense } from 'react'

import TotalCustomers from './cards/total-customers'
import TotalDocuments from './cards/total-documents'
import TotalDocumentsIncome from './cards/total-documents-income'
import TotalOrganization from './cards/total-organization'

export default async function SectionTotalCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Suspense fallback={<Skeleton className="h-[210.5px] w-full" />}>
        <TotalDocuments />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[210.5px] w-full" />}>
        <TotalCustomers />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[210.5px] w-full" />}>
        <TotalOrganization />
      </Suspense>
      <TotalDocumentsIncome />
    </div>
  )
}
