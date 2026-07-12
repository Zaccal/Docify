import { and, db, eq, gte, lt, ne, sum } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'

import { DEFAULT_COMPANY_TYPE, START_OF_NEXT_MONTH, START_OF_THIS_MONTH } from '@/lib/constants'
import type { Company } from '@/types/company.type'

export async function sumTotalAmountForCurrentMonth(company: Company = DEFAULT_COMPANY_TYPE) {
  const result = await db
    .select({
      totalAmount: sum(CostTransactionsTable.amount)
    })
    .from(CostTransactionsTable)
    .where(
      and(
        gte(CostTransactionsTable.transactionDate, START_OF_THIS_MONTH),
        lt(CostTransactionsTable.transactionDate, START_OF_NEXT_MONTH),
        eq(CostTransactionsTable.company, company),
        ne(CostTransactionsTable.status, 'VOID')
      )
    )

  const total = result[0]?.totalAmount ?? 0
  return parseFloat(String(total))
}
