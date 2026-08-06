'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod/mini'

import { processIgnore } from '@/server/applications/orders/process-ignore'

const ignoreSchema = z.uuid()

export async function ignoreAction(transactionId: string) {
  const parsed = ignoreSchema.safeParse(transactionId)

  if (!parsed.success) {
    return {
      success: false as const,
      error: 'Не коректний формат ID'
    }
  }

  try {
    await processIgnore(transactionId)
    revalidatePath('/transactions')
    return {
      success: true as const
    }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Не извесная ошибка'
    }
  }
}
