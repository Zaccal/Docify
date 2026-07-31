import { connection } from 'next/server'
import { Suspense } from 'react'

import DataTable from '@/components/data-table/data-table'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { transactionsColumns } from '@/features/transactions/components/transactions-table/columns-transactions'
import { getAllTransactions } from '@/server/repositories/transactions/get-all-transactions'

async function TransactionsTable() {
  await connection()

  const data = await getAllTransactions()

  return <DataTable columns={transactionsColumns} data={data} />
}

export default function Transactions() {
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
