import { db, eq } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'
import 'server-only'

export async function processIgnore(transactionId: string) {
  return await db.transaction(async (tx) => {
    const original = await tx.query.CostTransactionsTable.findFirst({
      where: eq(CostTransactionsTable.id, transactionId)
    })

    if (!original) throw new Error('Транзакция не найдена')
    if (original.status === 'VOID') throw new Error('Транзакция уже аннулирована')

    await tx
      .update(CostTransactionsTable)
      .set({ status: 'VOID' })
      .where(eq(CostTransactionsTable.id, transactionId))
  })
}
