import 'server-only'
import { db } from '@Docify/db'
import { OrganizationsTable } from '@Docify/db/schema'
import { cache } from 'react'

import { activityDateFilter } from '@/utils/activity-date-filter'
import { getMonthBounds } from '@/utils/get-month-bounds'

export const getOrganizationsStatistics = cache(async () => {
  const { startOfThisMonth, startOfNextMonth, startOfPrevMonth } = getMonthBounds()

  const [thisMonthCount, prevMonthCount] = await Promise.all([
    db.$count(
      OrganizationsTable,
      activityDateFilter(
        OrganizationsTable.createdAt,
        OrganizationsTable.updatedAt,
        startOfThisMonth,
        startOfNextMonth
      )
    ),
    db.$count(
      OrganizationsTable,
      activityDateFilter(
        OrganizationsTable.createdAt,
        OrganizationsTable.updatedAt,
        startOfPrevMonth,
        startOfNextMonth
      )
    )
  ])

  return { thisMonthCount, prevMonthCount }
})
