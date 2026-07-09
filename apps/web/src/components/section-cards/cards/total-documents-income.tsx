import { and, db, eq, or, sql } from '@Docify/db'
import { DocumentsTable, OrganizationsTable } from '@Docify/db/schema'
import { Badge } from '@Docify/ui/components/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@Docify/ui/components/card'

import { START_OF_NEXT_MONTH, START_OF_THIS_MONTH } from '@/lib/constants'
import { formatNumber } from '@/utils/format-number'

export default async function TotalDocumentsIncome() {
  const result = await db
    .select({
      sum: sql<number>`sum(${OrganizationsTable.totalCost})`
    })
    .from(DocumentsTable)
    .innerJoin(OrganizationsTable, eq(DocumentsTable.organizationId, OrganizationsTable.id))
    .where(
      or(
        and(
          sql`${DocumentsTable.createdAt} >= ${START_OF_THIS_MONTH}`,
          sql`${DocumentsTable.createdAt} < ${START_OF_NEXT_MONTH}`
        ),
        and(
          sql`${DocumentsTable.updatedAt} >= ${START_OF_THIS_MONTH}`,
          sql`${DocumentsTable.updatedAt} < ${START_OF_NEXT_MONTH}`
        )
      )
    )
    .limit(1)
  const totalSum = formatNumber(result[0].sum)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Сумма документов</CardDescription>
        <CardTitle className="text-2xl font-semibold text-nowrap tabular-nums @[250px]/card:text-3xl">
          {totalSum} ₸
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {/*<HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />*/}
            +4.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {/*{getStatus}*/}
          {/*<HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />*/}
        </div>
        <div className="text-muted-foreground">По счетам и актам выполненных работ</div>
      </CardFooter>
    </Card>
  )
}
