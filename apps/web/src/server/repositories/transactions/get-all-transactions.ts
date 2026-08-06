import 'server-only'
import { db, sql } from '@Docify/db'

export async function getAllTransactions() {
  const data = await db.query.CostTransactionsTable.findMany({
    with: {
      documentsTable: {
        with: {
          customer: {
            with: {
              organization: true
            }
          }
        }
      }
    },
    extras: (fields) => ({
      isRefunded: sql<boolean>`
            EXISTS (
              SELECT 1
              FROM cost_transactions_table AS reversal
              WHERE reversal.reverses_transaction_id = ${fields.id}
                AND reversal.type = 'REVERSAL'
                AND reversal.status = 'POSTED'
            )
          `.as('is_refunded'),
      isCanceled: sql<boolean>`
        ${fields.type} = 'REVERSAL'
        AND EXISTS (
          SELECT 1
          FROM cost_transactions_table AS cancellation
          WHERE cancellation.reverses_transaction_id = ${fields.id}
            AND cancellation.type = 'CHARGE'
            AND cancellation.status = 'POSTED'
        )
      `.as('is_canceled')
    })
  })

  return data
}

export type Transactions = Awaited<ReturnType<typeof getAllTransactions>>[number]
