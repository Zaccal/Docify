import { cacheTag } from 'next/cache'
import { Suspense } from 'react'

import DataTable from '@/components/data-table/data-table'
import { transactionsColumns } from '@/components/data-table/data-table-columns'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { getAllTransactions } from '@/server/repositories/transactions/get-all-transactions'

async function TransactionsTable() {
  'use cache'

  cacheTag('transactions')

  const data = await getAllTransactions()

  return <DataTable columns={transactionsColumns} data={data} />
}

export default function Operations() {
  return (
    <div className="wrapper">
      <h1 className="mt-8 text-4xl font-bold">Операции</h1>
      <div className="py-6">
        <Suspense fallback={<DataTableSkeleton />}>
          <TransactionsTable />
        </Suspense>
      </div>
    </div>
  )
}
