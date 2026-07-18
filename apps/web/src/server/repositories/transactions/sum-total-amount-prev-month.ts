import { and, db, eq, gte, lt, sum } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'

import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'
import type { Company } from '@/types/company.type'
import { getMonthBounds } from '@/utils/get-month-bounds'

export async function sumTotalAmountForPrevMonth(company: Company = DEFAULT_COMPANY_TYPE) {
  const { startOfPrevMonth, startOfNextMonth } = getMonthBounds()

  const result = await db
    .select({
      totalAmount: sum(CostTransactionsTable.amount)
    })
    .from(CostTransactionsTable)
    .where(
      and(
        gte(CostTransactionsTable.transactionDate, startOfPrevMonth),
        lt(CostTransactionsTable.transactionDate, startOfNextMonth),
        eq(CostTransactionsTable.company, company)
      )
    )

  const total = result[0]?.totalAmount ?? 0
  return parseFloat(String(total))
}
