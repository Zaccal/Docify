import { db } from '@Docify/db'

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
    }
  })

  return data
}
export type Transactions = Awaited<ReturnType<typeof getAllTransactions>>[number]
