import type { TransactionSnapshot } from '@Docify/db'

import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'

export function restoreTransactionFromSnapshot(
  snapshot: TransactionSnapshot
): NonNullable<FindDocumentByIdData> {
  return {
    ...snapshot.document,
    createdAt: new Date(),
    updatedAt: new Date(),
    customer: {
      ...snapshot.customer,
      createdAt: new Date(),
      updatedAt: new Date(),
      organization: {
        ...snapshot.organization,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  }
}
