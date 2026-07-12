import { db, eq } from '@Docify/db'
import { CostTransactionsTable } from '@Docify/db/schema'
import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'
import type { Company } from '@/types/company.type'

export async function GET(req: NextRequest) {
  const company = (decodeURIComponent(req.nextUrl.searchParams.get('company') as string) ??
    DEFAULT_COMPANY_TYPE) as Company

  const result = await db
    .select({
      date: CostTransactionsTable.transactionDate,
      amount: CostTransactionsTable.amount
    })
    .from(CostTransactionsTable)
    .where(eq(CostTransactionsTable.company, company))
  return NextResponse.json(result)
}
