import 'server-only'
import { db } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'
import { cache } from 'react'

import { activityDateFilter } from '@/utils/activity-date-filter'
import { getMonthBounds } from '@/utils/get-month-bounds'

export const getDocumentsStatistics = cache(async () => {
  const { startOfThisMonth, startOfNextMonth, startOfPrevMonth } = getMonthBounds()

  const [thisMonthCount, prevMonthCount] = await Promise.all([
    db.$count(
      DocumentsTable,
      activityDateFilter(
        DocumentsTable.createdAt,
        DocumentsTable.updatedAt,
        startOfThisMonth,
        startOfNextMonth
      )
    ),
    db.$count(
      DocumentsTable,
      activityDateFilter(
        DocumentsTable.createdAt,
        DocumentsTable.updatedAt,
        startOfPrevMonth,
        startOfNextMonth
      )
    )
  ])

  return { thisMonthCount, prevMonthCount }
})
