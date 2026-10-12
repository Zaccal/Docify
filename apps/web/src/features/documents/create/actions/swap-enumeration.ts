'use server'

import { asc, db, eq, inArray } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'

import { getTemporaryEnumeration } from '@/server/repositories/documents/get-temporary-enumeration'

interface SwapEnumerationInput {
  currentDocumentId: string
  conflictingDocumentId: string
  expectedCurrentEnumeration: string
  expectedConflictEnumeration: string
  expectedYear: number
}

export async function swapEnumeration({
  currentDocumentId,
  conflictingDocumentId,
  expectedCurrentEnumeration,
  expectedConflictEnumeration,
  expectedYear
}: SwapEnumerationInput) {
  try {
    const updatedCurrentDocument = await db.transaction(async (tx) => {
      if (currentDocumentId === conflictingDocumentId) {
        throw new Error('Невозможно переставить документ с самим собой')
      }

      const documents = await tx
        .select()
        .from(DocumentsTable)
        .where(inArray(DocumentsTable.id, [currentDocumentId, conflictingDocumentId]))
        .orderBy(asc(DocumentsTable.id))
        .for('update')

      const currentDocument = documents.find((document) => document.id === currentDocumentId)

      const conflictingDocument = documents.find(
        (document) => document.id === conflictingDocumentId
      )

      if (!currentDocument || !conflictingDocument) {
        throw new Error('Документы не найдены')
      }

      const currentDocumentYear = currentDocument.createdAt.getFullYear()
      const conflictDocumentYear = conflictingDocument.createdAt.getFullYear()

      if (currentDocumentYear !== expectedYear || conflictDocumentYear !== expectedYear) {
        throw new Error('Документы были изменены. Попробуйте ещё раз')
      }

      if (
        currentDocument.enumeration !== expectedCurrentEnumeration ||
        conflictingDocument.enumeration !== expectedConflictEnumeration
      ) {
        throw new Error('Порядковые номера документов были изменены. Попробуйте ещё раз')
      }

      const currentDocumentEnumeration = currentDocument.enumeration
      const conflictingDocumentEnumeration = conflictingDocument.enumeration

      if (currentDocumentEnumeration === conflictingDocumentEnumeration) {
        throw new Error('Невозможно переставить документы с одинаковым порядковым номером')
      }

      const temporaryEnumeration = await getTemporaryEnumeration(tx, expectedYear)

      await tx
        .update(DocumentsTable)
        .set({ enumeration: temporaryEnumeration })
        .where(eq(DocumentsTable.id, currentDocumentId))

      await tx
        .update(DocumentsTable)
        .set({ enumeration: currentDocumentEnumeration })
        .where(eq(DocumentsTable.id, conflictingDocumentId))

      const [updatedCurrentDocument] = await tx
        .update(DocumentsTable)
        .set({ enumeration: conflictingDocumentEnumeration })
        .where(eq(DocumentsTable.id, currentDocumentId))
        .returning()

      if (!updatedCurrentDocument) {
        throw new Error('Не удалось переставить порядковые номера документов')
      }

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
