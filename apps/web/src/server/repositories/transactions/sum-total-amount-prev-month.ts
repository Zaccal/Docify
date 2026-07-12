import { and, db, gte, lt, sum } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'

import { START_OF_NEXT_MONTH, START_OF_PREV_MONTH } from '@/lib/constants'

export async function sumTotalAmountForPrevMonth() {
  const result = await db
    .select({
      totalAmount: sum(CostTransactionsTable.amount)
    })
    .from(CostTransactionsTable)
    .where(
      and(
        gte(CostTransactionsTable.transactionDate, START_OF_PREV_MONTH),
        lt(CostTransactionsTable.transactionDate, START_OF_NEXT_MONTH)
      )
    )

  const total = result[0]?.totalAmount ?? 0
  return parseFloat(String(total))
}
