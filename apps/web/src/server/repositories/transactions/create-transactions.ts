import { type TransactionType } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema/transactions'

export type CostTransactionInput = Omit<
  typeof CostTransactionsTable.$inferInsert,
  'transactionDate' | 'type'
>

export async function createChargeTransaction(tx: TransactionType, data: CostTransactionInput) {
  return tx
    .insert(CostTransactionsTable)
    .values({
      documentId: data.documentId,
      amount: data.amount,
      operationId: data.operationId,
      ip: data.ip,
      type: 'CHARGE',
      reason: data.reason,
      status: data.status,
      reversesTransactionId: data.reversesTransactionId,
      snapshot: data.snapshot
    })
    .returning()
}

export async function createReversalTransaction(tx: TransactionType, data: CostTransactionInput) {
  return tx
    .insert(CostTransactionsTable)
    .values({
      documentId: data.documentId,
      amount: data.amount,
      operationId: data.operationId,
      ip: data.ip,
      type: 'REVERSAL',
      reason: data.reason,
      status: data.status,
      reversesTransactionId: data.reversesTransactionId,
      snapshot: data.snapshot
    })
    .returning()
}
