import { DatabaseError, DrizzleQueryError } from '@Docify/db'

import { UNIQUE_CONSTRAINT_MESSAGES } from '@/lib/constants'

export function formatPostgresError(error: unknown): string {
  if (error instanceof DrizzleQueryError && error.cause instanceof DatabaseError) {
    const databaseError = error.cause

    if (databaseError.code === '23505') {
      const constraintName = databaseError.constraint ?? ''

      return UNIQUE_CONSTRAINT_MESSAGES[constraintName] ?? 'Запись с такими данными уже существует'
    }

    if (databaseError.code === '23503') {
      return 'Не найдена связанная запись'
    }

    if (databaseError.code === '23502') {
      return 'Не заполнено обязательное поле'
    }

    return 'Не удалось сохранить данные в базе данных'
  }

  return error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
}
