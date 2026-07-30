import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { Suspense } from 'react'

import TransactionsCustomerDetails from '@/components/transactions/transactions-customer-details'
import TransactionsDocumentDetails from '@/components/transactions/transactions-document-details'
import TransactionsHeader from '@/components/transactions/transactions-header'
import TransactionsOrganizationDetails from '@/components/transactions/transactions-organization-details'
import TransactionsSummary from '@/components/transactions/transactions-summary'
import getTransactionWithDocument from '@/server/repositories/transactions/get-transaction-with-document'

interface Params {
  id: string
}

interface PageProps {
  params: Promise<Params>
}

export default async function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading Transaction...</div>}>
      <Transaction params={params} />
    </Suspense>
  )
}

async function Transaction({ params }: { params: Promise<Params> }) {
  await connection()

  const { id } = await params
  const transaction = await getTransactionWithDocument(id)

  if (!transaction.cost_transactions_table) notFound()

  return (
    <div className="wrapper">
      <TransactionsHeader transactionWithDocument={transaction} />

      <TransactionsSummary transactionWithDocument={transaction} />

      <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
        <TransactionsOrganizationDetails transactionWithDocument={transaction} />

        <div className="grid gap-4">
          <TransactionsCustomerDetails transactionWithDocument={transaction} />
          <TransactionsDocumentDetails transactionWithDocument={transaction} />
        </div>
      </div>
    </div>
  )
}
