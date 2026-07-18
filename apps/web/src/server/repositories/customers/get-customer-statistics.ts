import 'server-only'
import { db } from '@Docify/db'
import { CustomersTable } from '@Docify/db/schema'
import { cache } from 'react'

import { activityDateFilter } from '@/utils/activity-date-filter'
import { getMonthBounds } from '@/utils/get-month-bounds'

export const getCustomerStatistics = cache(async () => {
  const { startOfNextMonth, startOfPrevMonth, startOfThisMonth } = getMonthBounds()

  const [thisMonthCount, prevMonthCount] = await Promise.all([
    db.$count(
      CustomersTable,
      activityDateFilter(
        CustomersTable.createdAt,
        CustomersTable.updatedAt,
        startOfThisMonth,
        startOfNextMonth
      )
    ),
    db.$count(
      CustomersTable,
      activityDateFilter(
        CustomersTable.createdAt,
        CustomersTable.updatedAt,
        startOfPrevMonth,
        startOfNextMonth
      )
    )
  ])

  return {
    thisMonthCount,
    prevMonthCount
  }
})
