import { eq, type TransactionType } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema/transactions'

export async function findTransactionsByOperationIdInTransaction(
  tx: TransactionType,
  operationId: string
) {
  return await tx.query.CostTransactionsTable.findFirst({
    where: eq(CostTransactionsTable.operationId, operationId)
  })
}
