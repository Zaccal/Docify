import { db } from '@Docify/db'

import type { DocumentFormSchema } from '@/schemas/document-schema/document.schema'
import { createTransactionSnapshot } from '@/utils/create-transaction-snapshot'

import { findDocumentById } from '../../repositories/documents/find-document-by-id'
import { upsertDocument } from '../../repositories/documents/upsert-document'
import { createChargeTransaction } from '../../repositories/transactions/create-transactions'
import { findTransactionsByOperationId } from '../../repositories/transactions/find-transactions-by-operation-id'

export async function processNewOrder(data: DocumentFormSchema) {
  const { operationId, ...rest } = data

  return db.transaction(async (tx) => {
    const existingTransaction = await findTransactionsByOperationId(tx, operationId)

    if (existingTransaction) {
      if (!existingTransaction.documentId) throw new Error('Id документа не найден')

      const document = await findDocumentById(existingTransaction.documentId)

      if (!document) throw new Error('Документ существующей операции не найден')

      return {
        document,
        transaction: existingTransaction,
        dublicatedRequest: true
      }
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
      document,
      customer,
      organization,
      transaction,
      dublicatedRequest: false
    }
  })
}
