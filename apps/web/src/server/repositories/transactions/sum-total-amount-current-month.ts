import { and, db, eq, gte, lt, ne, sum } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'

import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'
import type { Company } from '@/types/company.type'
import { getMonthBounds } from '@/utils/get-month-bounds'

export async function sumTotalAmountForCurrentMonth(company: Company = DEFAULT_COMPANY_TYPE) {
  const { startOfThisMonth, startOfNextMonth } = getMonthBounds()

  const result = await db
    .select({
      totalAmount: sum(CostTransactionsTable.amount)
    })
    .from(CostTransactionsTable)
    .where(
      and(
        gte(CostTransactionsTable.transactionDate, startOfThisMonth),
        lt(CostTransactionsTable.transactionDate, startOfNextMonth),
        eq(CostTransactionsTable.company, company),
        ne(CostTransactionsTable.status, 'VOID')
      )
    )

  const total = result[0]?.totalAmount ?? 0
  return parseFloat(String(total))
}
