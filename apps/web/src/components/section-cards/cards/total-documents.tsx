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
import { connection } from 'next/server'

import { getDocumentsStatistics } from '@/server/repositories/documents/get-documents-statistics'
import { formatNumber } from '@/utils/format-number'
import { getStatisticIcon, getStatisticText } from '@/utils/get-statistic-text'

export default async function TotalDocuments() {
  await connection()
  const { thisMonthCount, prevMonthCount } = await getDocumentsStatistics()

  const percentage =
    prevMonthCount === 0
      ? thisMonthCount > 0
        ? 100
        : 0
      : ((thisMonthCount - prevMonthCount) / prevMonthCount) * 100
  const formattedPercentage = `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Всего документов</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {formatNumber(thisMonthCount)}
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
        <div className="text-muted-foreground">Договора, счета, акты и ордера</div>
      </CardFooter>
    </Card>
  )
}
