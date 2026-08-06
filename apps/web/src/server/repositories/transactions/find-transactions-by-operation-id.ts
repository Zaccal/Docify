import { db, eq } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'

export async function findTransactionsByOperationId(operationId: string) {
  const transaction = await db.query.CostTransactionsTable.findFirst({
    where: eq(CostTransactionsTable.operationId, operationId)
  })

  return transaction
}
