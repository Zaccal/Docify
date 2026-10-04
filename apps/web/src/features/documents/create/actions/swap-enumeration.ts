'use server'

import { db, eq } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'

export async function swapEnumeration(currentDocumentId: string, conflictDocumentId: string) {
  try {
    const updatedCurrentDocument = await db.transaction(async (tx) => {
      const [currentDocument] = await tx
        .select()
        .from(DocumentsTable)
        .where(eq(DocumentsTable.id, currentDocumentId))
      const [conflictDocument] = await tx
        .select()
        .from(DocumentsTable)
        .where(eq(DocumentsTable.id, conflictDocumentId))

      if (!currentDocument || !conflictDocument) {
        throw new Error('Документы не найдены')
      }

      const currentDocumentYear = currentDocument.createdAt.getFullYear()
      const conflictDocumentYear = conflictDocument.createdAt.getFullYear()

      if (currentDocumentYear !== conflictDocumentYear) {
        throw new Error('Невозможно переставить документы с разными годами')
      }

      const currentDocumentEnumeration = currentDocument.enumeration
      const conflictDocumentEnumeration = conflictDocument.enumeration

      if (currentDocumentEnumeration === conflictDocumentEnumeration) {
        throw new Error('Невозможно переставить документы с одинаковым порядковым номером')
      }

      const TEMP_ENUMERATION_VALUE = 'TEMP' as const

      await tx
        .update(DocumentsTable)
        .set({ enumeration: TEMP_ENUMERATION_VALUE })
        .where(eq(DocumentsTable.id, currentDocumentId))

      await tx
        .update(DocumentsTable)
        .set({ enumeration: currentDocumentEnumeration })
        .where(eq(DocumentsTable.id, conflictDocumentId))

      const [updatedCurrentDocument] = await tx
        .update(DocumentsTable)
        .set({ enumeration: conflictDocumentEnumeration })
        .where(eq(DocumentsTable.id, currentDocumentId))
        .returning()

      return updatedCurrentDocument
    })

    return {
      success: true,
      data: updatedCurrentDocument
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Произошла непредвиденная ошибка'
    }
  }
}
