'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod/mini'

import { processCancel } from '@/server/applications/orders/process-cancel'

const cancelSchema = z.uuid()

export async function cancelAction(transactionId: string) {
  const parsedId = cancelSchema.safeParse(transactionId)

  if (!parsedId.success) {
    return {
      success: false as const,
      error: 'Некоректный идентификатор транзакции'
    }
  }

  try {
    const canceledTransaction = await processCancel(transactionId)
    revalidatePath('/transactions')
    return {
      success: true as const,
      data: canceledTransaction
    }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
    }
  }
}
