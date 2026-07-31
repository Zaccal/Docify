'use client'

import { Badge } from '@Docify/ui/components/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@Docify/ui/components/card'
import { Skeleton } from '@Docify/ui/components/skeleton'
import { HugeiconsIcon } from '@hugeicons/react'

import { getStatisticIcon, getStatisticText } from '@/features/dashboard/utils/get-statistic-text'
import { useLocalStorage } from '@/hooks'
import { useQuery } from '@/hooks/useQuery'
import { COMPANY_LOCAL_STORAGE_KEY } from '@/lib/constants'
import type { Company } from '@/types/company.type'
import { formatNumber } from '@/utils/format-number'

export default function TotalDocumentsIncome() {
  const company = useLocalStorage<Company>(COMPANY_LOCAL_STORAGE_KEY).value
  const {
    data: totalIncome,
    isError,
    isLoading
  } = useQuery<[number, number]>(
    async () => {
      const response = await fetch(`/api/transactions/total-income?company=${company}`)
      return response.json()
    },
    { enabled: !!company, keys: [company] }
  )

  if (isError) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Ой, что-то пошло не так</CardTitle>
          <CardDescription>
            Попробуйте обновить страницу или обратитесь к администратору.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (isLoading ?? !totalIncome) return <Skeleton className="h-[210.5px] w-full" />

  const fallbackIncome = totalIncome ?? []
  const totalSum = fallbackIncome[0] ?? 0
  const prevMonthSum = fallbackIncome[1] ?? 0

  const percentage =
    prevMonthSum === 0 ? (totalSum > 0 ? 100 : 0) : ((totalSum - prevMonthSum) / prevMonthSum) * 100
  const formattedPercentage = `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`

  const formattedTotalSum = formatNumber(totalSum)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Сумма документов</CardDescription>
        <CardTitle className="text-2xl font-semibold text-nowrap tabular-nums @[250px]/card:text-3xl">
          {formattedTotalSum} ₸
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <HugeiconsIcon icon={getStatisticIcon(percentage)} strokeWidth={2} />
            {formattedPercentage}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">{getStatisticText(percentage)}</div>
        <div className="text-muted-foreground">По счетам и актам выполненных работ</div>
      </CardFooter>
    </Card>
  )
}
