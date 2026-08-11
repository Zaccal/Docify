import { Skeleton } from '@Docify/ui/components/skeleton'
import { connection } from 'next/server'
import { Suspense } from 'react'

import DataTable from '@/components/data-table/data-table'
import { getLatestEditedDocuments } from '@/server/repositories/documents/get-lastest-edited-documents'

import { recentDocumentsColumns } from './recent-documents-columns'

export default async function RecentDocumentsTable() {
  return (
    <div className="px-4">
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <RecentDocuments />
      </Suspense>
    </div>
  )
}
export async function RecentDocuments() {
  await connection()

  const documents = await getLatestEditedDocuments()

  return (
    <>
      <DataTable
        showPagination={false}
        showSearch={false}
        data={documents}
        columns={recentDocumentsColumns}
      />
    </>
  )
}
