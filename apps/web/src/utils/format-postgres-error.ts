import { DatabaseError, DrizzleQueryError } from '@Docify/db'

import { UNIQUE_CONSTRAINT_MESSAGES } from '@/lib/constants'

export function formatPostgresError(error: unknown): string {
  if (error instanceof DrizzleQueryError && error.cause instanceof DatabaseError) {
    const constrainName = error.cause.constraint ?? ''
    const friendlyMessage =
      UNIQUE_CONSTRAINT_MESSAGES[constrainName] ??
      'Уникальная ограничение нарушено, какая-то из полей ' + constrainName + ' уже существует'
    return friendlyMessage
  }
  return error instanceof Error ? error.message : String(error)
}
