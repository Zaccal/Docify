import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'
import { sumTotalAmountForCurrentMonth } from '@/server/repositories/transactions/sum-total-amount-current-month'
import { sumTotalAmountForPrevMonth } from '@/server/repositories/transactions/sum-total-amount-prev-month'
import type { Company } from '@/types/company.type'

export async function GET(req: NextRequest) {
  const company = (decodeURIComponent(req.nextUrl.searchParams.get('company') as string) ??
    DEFAULT_COMPANY_TYPE) as Company

  const result = await Promise.all([
    sumTotalAmountForCurrentMonth(company),
    sumTotalAmountForPrevMonth(company)
  ])

  console.log(result)
  return NextResponse.json(result, { status: 200 })
}
