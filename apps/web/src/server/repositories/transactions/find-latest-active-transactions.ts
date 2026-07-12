import { db, eq, desc } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema/transactions'

export async function findLatestActiveTransactions() {
  return await db
    .select()
    .from(CostTransactionsTable)
    .where(eq(CostTransactionsTable.status, 'POSTED'))
    .orderBy(desc(CostTransactionsTable.transactionDate))
}
