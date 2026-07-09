import { and, gte, lt, or, type AnyColumn } from '@Docify/db'

export function activityDateFilter(
  createdAt: AnyColumn,
  updatedAt: AnyColumn,
  start: Date,
  end: Date
) {
  return or(
    and(gte(createdAt, start), lt(createdAt, end)),
    and(gte(updatedAt, start), lt(updatedAt, end))
  )
}
