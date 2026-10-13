import { db } from '@Docify/db'

import type { DocumentFormSchema } from '@/features/documents/form/schemas/document-schema/document.schema'
import { checkEnumerationConflict } from '@/server/repositories/documents/check-enumeration-conflict/check-enumeration-conflict'
import { findDocumentById } from '@/server/repositories/documents/find-document-by-id'
import { upsertDocument } from '@/server/repositories/documents/upsert-document'
import { createChargeTransaction } from '@/server/repositories/transactions/create-transactions'
import { findTransactionsByOperationIdInTransaction } from '@/server/repositories/transactions/find-transactions-by-operation-id-in-transaction'
import type { NewOrderResult } from '@/types/document-result.type'
import 'server-only'

import { createTransactionSnapshot } from '@/utils/create-transaction-snapshot'

export async function processNewOrder(data: DocumentFormSchema): Promise<NewOrderResult> {
  const { operationId, ...rest } = data

  return db.transaction<NewOrderResult>(async (tx) => {
    const existingTransaction = await findTransactionsByOperationIdInTransaction(tx, operationId)

    if (existingTransaction) {
      if (!existingTransaction.documentId) throw new Error('Id документа не найден')

      const document = await findDocumentById(existingTransaction.documentId)

      if (!document) throw new Error('Документ существующей операции не найден')

      return {
        success: true,
        data: {
          document,
          transaction: existingTransaction,
          dublicatedRequest: true
        },
        conflict: null
      }
    }

    const enumerationConflict = await checkEnumerationConflict(tx, rest)

    if (!enumerationConflict.success) {
      return enumerationConflict
    }

    const { document, customer, organization } = await upsertDocument(tx, rest)

    const snapshot = createTransactionSnapshot({
      document,
      customer,
      organization
    })

    const [transaction] = await createChargeTransaction(tx, {
      operationId,
      documentId: document.id,
      amount: organization.totalCost,
      snapshot,
      company: data.company,
      reason: 'NEW_ORDER',
      status: 'POSTED'
    })

    return {
      success: true,
      data: {
        document,
        transaction,
        dublicatedRequest: false
      },
      conflict: null
    }
  })
}
