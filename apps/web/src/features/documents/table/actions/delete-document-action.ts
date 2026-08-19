'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod/mini'

import { deleteDocument } from '@/server/repositories/documents/delete-document'

const deleteDocumentSchema = z.uuid()

export async function deleteDocumentAction(documentId: string) {
  const parsedId = deleteDocumentSchema.safeParse(documentId)

  if (!parsedId.success) {
    return {
      success: false as const,
      error: 'Некорректный идентификатор документа'
    }
  }

  try {
    const deletedDocument = await deleteDocument(documentId)

    if (!deletedDocument) {
      return {
        success: false as const,
        error: 'Документ не найден'
      }
    }

    revalidatePath('/documents')

    return {
      success: true as const
    }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Не удалось удалить документ'
    }
  }
}
