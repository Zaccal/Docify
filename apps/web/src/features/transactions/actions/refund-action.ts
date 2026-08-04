'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod/mini'

import { processRefund } from '@/server/applications/orders/process-refund'
import type { Company } from '@/types/company.type'

const refundSchema = z.uuid()

export async function refundAction(transactionId: string, company: Company) {
  const parsed = refundSchema.safeParse(transactionId)

  if (!parsed.success) {
    return {
      success: false as const,
      error: 'Некоректный '
    }
  }

  try {
    const refund = await processRefund(transactionId, company)
    revalidatePath('/transactions')
    return {
      success: true as const,
      refund
    }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Не удалось выполнить возврат'
    }
  }
}
