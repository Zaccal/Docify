import { and, db, eq } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'

import type { Company } from '@/types/company.type'
import 'server-only'

export async function processRefund(transactionId: string, company: Company) {
  return db.transaction(async (tx) => {
    const original = await tx.query.CostTransactionsTable.findFirst({
      where: eq(CostTransactionsTable.id, transactionId)
    })

    if (!original) throw new Error('Транзакция не найдена')
    if (original.type !== 'CHARGE') throw new Error('Возможно возместить только транзакции оплаты.')
    if (original.status !== 'POSTED')
      throw new Error('Возврат возможен только для проведенных транзакций.')

    const existingRefund = await tx.query.CostTransactionsTable.findFirst({
      where: and(
        eq(CostTransactionsTable.reversesTransactionId, original.id),
        eq(CostTransactionsTable.type, 'REVERSAL'),
        eq(CostTransactionsTable.status, 'POSTED')
      )
    })

    if (existingRefund) throw new Error('По этой транзакции уже был выполнен возврат')

    const [refund] = await tx
      .insert(CostTransactionsTable)
      .values({
        documentId: original.documentId,
        operationId: crypto.randomUUID(),
        amount: -Math.abs(original.amount),
        snapshot: original.snapshot,
        company,
        reversesTransactionId: original.id,
        reason: 'REFUND',
        status: 'POSTED',
        type: 'REVERSAL'
      })
      .returning()

    return refund
  })
}
