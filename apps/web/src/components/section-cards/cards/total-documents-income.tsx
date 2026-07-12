import { Badge } from '@Docify/ui/components/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@Docify/ui/components/card'
import { HugeiconsIcon } from '@hugeicons/react'

import { sumTotalAmountForCurrentMonth } from '@/server/repositories/transactions/sum-total-amount-current-month'
import { sumTotalAmountForPrevMonth } from '@/server/repositories/transactions/sum-total-amount-prev-month'
import { formatNumber } from '@/utils/format-number'
import { getStatisticIcon, getStatisticText } from '@/utils/get-statistic-text'

export default async function TotalDocumentsIncome() {
  const result = await Promise.all([sumTotalAmountForCurrentMonth(), sumTotalAmountForPrevMonth()])

  const totalSum = result[0]
  const prevMonthSum = result[1]

  const percentage =
    prevMonthSum === 0 ? (totalSum > 0 ? 100 : 0) : ((totalSum - prevMonthSum) / prevMonthSum) * 100

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
            +4.5%
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
