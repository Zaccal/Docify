import { DatabaseError } from '@Docify/db'

import { UNIQUE_CONSTRAINT_MESSAGES } from '@/lib/constants'

export function formatPostgresError(error: unknown): string {
  if (error instanceof DatabaseError && error.code === '23505') {
    const constrainName = error.constraint ?? ''
    console.log(`\n\n\n\nconstrainName: ${constrainName}\n\n\n\n\n`)
    const friendlyMessage =
      UNIQUE_CONSTRAINT_MESSAGES[constrainName] ??
      'Уникальная ограничение нарушено, какая-то из полей ' + constrainName + ' уже существует'
    return friendlyMessage
  }
  return error instanceof Error ? error.message : String(error)
}
