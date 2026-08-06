import { and, db, eq } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'
import 'server-only'

export async function processCancel(transactionId: string) {
  return db.transaction(async (tx) => {
    const reversal = await tx.query.CostTransactionsTable.findFirst({
      where: eq(CostTransactionsTable.id, transactionId)
    })

    if (!reversal) throw new Error('Транзакция не найдена')
    if (reversal.type !== 'REVERSAL') throw new Error('Можно отменить только транзакцию возврата')
    if (reversal.status !== 'POSTED') throw new Error('Можно отменить только проведённый возврат')
    if (!reversal.reversesTransactionId) throw new Error('Возврат не связан с исходной транзакцией')

    const originalCharge = await tx.query.CostTransactionsTable.findFirst({
      where: and(
        eq(CostTransactionsTable.id, reversal.reversesTransactionId),
        eq(CostTransactionsTable.type, 'CHARGE')
      )
    })

    if (!originalCharge) throw new Error('Исходная транзакция оплаты не найдена')

    const existingCancellation = await tx.query.CostTransactionsTable.findFirst({
      columns: {
        id: true
      },
      where: and(
        eq(CostTransactionsTable.reversesTransactionId, reversal.id),
        eq(CostTransactionsTable.type, 'CHARGE'),
        eq(CostTransactionsTable.reason, 'CANCELLATION'),
        eq(CostTransactionsTable.status, 'POSTED')
      )
    })

    if (existingCancellation) throw new Error('Возврат уже был отменён')

    const [cancellation] = await tx
      .insert(CostTransactionsTable)
      .values({
        documentId: reversal.documentId,
        operationId: crypto.randomUUID(),
        amount: Math.abs(reversal.amount),
        snapshot: reversal.snapshot,
        company: reversal.company,

        type: 'CHARGE',
        reason: 'CANCELLATION',
        status: 'POSTED',

        reversesTransactionId: reversal.id
      })
      .returning()

    return cancellation
  })
}
