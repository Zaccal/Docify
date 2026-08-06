import 'server-only'
import { db, eq } from '@Docify/db'
import { CostTransactionsTable, DocumentsTable } from '@Docify/db/schema'

export default async function getTransactionWithDocument(operationId: string) {
  const [result] = await db
    .select()
    .from(CostTransactionsTable)
    .leftJoin(DocumentsTable, eq(CostTransactionsTable.documentId, DocumentsTable.id))
    .where(eq(CostTransactionsTable.operationId, operationId))
    .limit(1)

  return result
}

export type TransactionWithDocument = Awaited<ReturnType<typeof getTransactionWithDocument>>
