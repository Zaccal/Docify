import { Card, CardContent, CardHeader, CardTitle } from '@Docify/ui/components/card'
import { Skeleton } from '@Docify/ui/components/skeleton'
import { connection } from 'next/server'
import { Suspense } from 'react'

import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import DocumentsTable from '@/features/documents/table/components/documents-table'
import { getDocumentsCount } from '@/server/repositories/documents/get-documents-count'

async function DocumentsCountCard() {
  await connection()

  const count = await getDocumentsCount()

  return (
    <Card className="bg-surface-container-low! max-w-sm">
      <CardHeader>
        <CardTitle>Документы в базе</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{count}</div>
      </CardContent>
    </Card>
  )
}

async function DocumentsTableSection() {
  await connection()

  return <DocumentsTable />
}

export default function Documents() {
  return (
    <div className="wrapper">
      <h1 className="mt-8 text-4xl font-bold">Документы</h1>

      <div className="mt-6">
        <Suspense fallback={<Skeleton className="h-36 max-w-sm" />}>
          <DocumentsCountCard />
        </Suspense>
      </div>

      <div className="py-6">
        <Suspense fallback={<DataTableSkeleton />}>
          <DocumentsTableSection />
        </Suspense>
      </div>
    </div>
  )
}
