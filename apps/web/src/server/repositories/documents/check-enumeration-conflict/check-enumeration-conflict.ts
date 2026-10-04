import type { TransactionType } from '@Docify/db'
import 'server-only'

import type { DocumentFormSchema } from '@/features/documents/form/schemas/document-schema/document.schema'
import type { DocumentResult } from '@/types/document-result.type'

import { findDocumentByCustomerIin } from './helpers/find-document-by-customer-iin'
import { findDocumentByEnumerationAndYear } from './helpers/find-document-by-enumeration-and-year'

export async function checkEnumerationConflict(
  tx: TransactionType,
  data: Omit<DocumentFormSchema, 'operationId'>
): Promise<DocumentResult> {
  const existing = await findDocumentByCustomerIin(tx, data.iin)

  const currentDocument = existing?.Document ?? null

  const year = currentDocument ? currentDocument.createdAt.getFullYear() : new Date().getFullYear()

  const enumerationConflictDocument = await findDocumentByEnumerationAndYear(
    tx,
    data.enumeration,
    year
  )

  if (!enumerationConflictDocument || enumerationConflictDocument.id === currentDocument?.id) {
    return {
      success: true,
      data: null,
      conflict: null
    }
  }

  return {
    success: false,
    data: null,
    conflict: {
      action: currentDocument ? 'swap' : 'reject',
      year,
      enumeration: data.enumeration,
      currentDocument: currentDocument
        ? { id: currentDocument.id, enumeration: currentDocument.enumeration }
        : null,
      conflictingDocument: {
        id: enumerationConflictDocument.id,
        enumeration: enumerationConflictDocument.enumeration
      }
    }
  }
}
