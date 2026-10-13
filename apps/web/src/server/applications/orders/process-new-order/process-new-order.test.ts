import { afterAll, beforeEach, describe, expect, mock, spyOn, test } from 'bun:test'

import type { TransactionType } from '@Docify/db'

import { documentFormSchema } from '@/features/documents/form/schemas/document-schema/document.schema'
import type { DocumentState } from '@/features/documents/form/types/document-state.type'

mock.module('server-only', () => ({}))
mock.module('@Docify/env/server', () => ({
  env: { DATABASE_URL: 'postgresql://localhost/docify-test' }
}))

const { db } = await import('@Docify/db')
const customerLookup =
  await import('@/server/repositories/documents/check-enumeration-conflict/helpers/find-document-by-customer-iin')
const customerNameLookup =
  await import('@/server/repositories/documents/check-enumeration-conflict/helpers/find-customer-fullName-by-id')
const enumerationLookup =
  await import('@/server/repositories/documents/check-enumeration-conflict/helpers/find-document-by-enumeration-and-year')
const documentLookup = await import('@/server/repositories/documents/find-document-by-id')
const documentRepository = await import('@/server/repositories/documents/upsert-document')
const transactionLookup =
  await import('@/server/repositories/transactions/find-transactions-by-operation-id-in-transaction')
const transactionRepository = await import('@/server/repositories/transactions/create-transactions')

const tx = {} as TransactionType
const runTransaction = spyOn(db, 'transaction')
const findCustomer = spyOn(customerLookup, 'findDocumentByCustomerIin')
const findCustomerName = spyOn(customerNameLookup, 'findCustomerFullNameById')
const findEnumeration = spyOn(enumerationLookup, 'findDocumentByEnumerationAndYear')
const findDocument = spyOn(documentLookup, 'findDocumentById')
const upsertDocument = spyOn(documentRepository, 'upsertDocument')
const findTransaction = spyOn(transactionLookup, 'findTransactionsByOperationIdInTransaction')
const createCharge = spyOn(transactionRepository, 'createChargeTransaction')

const { checkEnumerationConflict } =
  await import('@/server/repositories/documents/check-enumeration-conflict/check-enumeration-conflict')
const { processNewOrder } = await import('../process-new-order/process-new-order')
const { createDocuments } = await import('@/features/documents/create/actions/create-documents')

const data = documentFormSchema.parse({
  operationId: '00000000-0000-4000-8000-000000000001',
  company: 'XANSHA',
  enumeration: '0002',
  documentDate: ['10.09.2026', '15.09.2026'],
  fullnameClient: 'Иванов И.И.',
  clientIdNumber: '123456789',
  clientIdDateFrom: '10.01.2020',
  clientIdType: 'МВД РК',
  iin: '990101300003',
  organization: 'Организация',
  bin: '123456789013',
  address: 'Сарыарка 6',
  city: 'Астана',
  costPerDay: '10000',
  iik: 'KZ123456789012345678',
  bik: 'HSBKKZKX',
  bank: 'Народный Банк',
  cellsLine: {}
})

const timestamps = { createdAt: new Date(2025, 8, 10), updatedAt: new Date(2025, 8, 15) }
const saved: Awaited<ReturnType<typeof documentRepository.upsertDocument>> = {
  document: {
    ...timestamps,
    id: 'document-1',
    customerId: 'customer-1',
    enumeration: data.enumeration,
    documentDate: data.documentDate,
    documentAddress: data.documentAddress,
    cellsLine: {}
  },
  customer: {
    ...timestamps,
    id: 'customer-1',
    organizationId: 'organization-1',
    fullnameClient: data.fullnameClient,
    iin: data.iin,
    clientIdDateFrom: data.clientIdDateFrom,
    clientIdNumber: data.clientIdNumber,
    clientIdType: data.clientIdType
  },
  organization: {
    ...timestamps,
    id: 'organization-1',
    organization: data.organization,
    bin: data.bin,
    address: data.address,
    city: data.city,
    costPerDay: data.costPerDay,
    totalCost: 50000,
    iik: data.iik,
    bik: data.bik,
    bank: data.bank,
    index: '',
    knp: null,
    kbe: null,
    templateType: data.templateType
  }
}
const conflictingDocument = { ...saved.document, id: 'document-2', customerId: 'customer-2' }
const conflictingCustomerFullName = 'Петров П.П.'
const transaction: Awaited<
  ReturnType<typeof transactionRepository.createChargeTransaction>
>[number] = {
  id: 'transaction-1',
  documentId: saved.document.id,
  operationId: data.operationId,
  amount: saved.organization.totalCost,
  company: data.company,
  transactionDate: new Date(),
  type: 'CHARGE',
  reason: 'NEW_ORDER',
  status: 'POSTED',
  reversesTransactionId: null,
  snapshot: { version: 1, ...saved }
}
const initialState: DocumentState = { success: false, data: null, conflict: null, values: {} }

function formData() {
  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    form.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
  }
  return form
}

beforeEach(() => {
  runTransaction.mockReset().mockImplementation(async (callback) => callback(tx))
  findCustomer.mockReset().mockResolvedValue(null)
  findCustomerName.mockReset().mockResolvedValue(conflictingCustomerFullName)
  findEnumeration.mockReset().mockResolvedValue(null)
  findDocument.mockReset().mockResolvedValue({
    ...saved.document,
    customer: { ...saved.customer, organization: saved.organization }
  })
  upsertDocument.mockReset().mockResolvedValue(saved)
  findTransaction.mockReset().mockResolvedValue(undefined)
  createCharge.mockReset().mockResolvedValue([transaction])
})

afterAll(() => mock.restore())

describe('checkEnumerationConflict', () => {
  test('allows a new customer when the enumeration is available', async () => {
    expect(await checkEnumerationConflict(tx, data)).toEqual({
      success: true,
      data: null,
      conflict: null
    })
    expect(findEnumeration).toHaveBeenCalledWith(tx, data.enumeration, new Date().getFullYear())
    expect(findCustomerName).not.toHaveBeenCalled()
  })

  test('allows keeping the current document enumeration', async () => {
    findCustomer.mockResolvedValue({ Customer: saved.customer, Document: saved.document })
    findEnumeration.mockResolvedValue(saved.document)

    expect(await checkEnumerationConflict(tx, data)).toEqual({
      success: true,
      data: null,
      conflict: null
    })
    expect(findCustomerName).not.toHaveBeenCalled()
  })

  test('rejects a conflict for a customer who has no document', async () => {
    findCustomer.mockResolvedValue({ Customer: saved.customer, Document: null })
    findEnumeration.mockResolvedValue(conflictingDocument)

    const result = await checkEnumerationConflict(tx, data)

    expect(result.conflict).toMatchObject({
      action: 'reject',
      currentDocument: null,
      conflictingDocument: { id: conflictingDocument.id, enumeration: data.enumeration },
      conflictingCustomer: { fullName: conflictingCustomerFullName }
    })
    expect(findCustomerName).toHaveBeenCalledWith(conflictingDocument.customerId)
    expect(findEnumeration).toHaveBeenCalledWith(tx, data.enumeration, new Date().getFullYear())
  })
})

describe('processNewOrder', () => {
  test('creates one charge with the document snapshot', async () => {
    const result = await processNewOrder(data)

    expect(result).toEqual({
      success: true,
      data: { document: saved.document, transaction, dublicatedRequest: false },
      conflict: null
    })
    expect(upsertDocument).toHaveBeenCalledTimes(1)
    expect(createCharge).toHaveBeenCalledTimes(1)
    expect(createCharge).toHaveBeenCalledWith(tx, {
      operationId: data.operationId,
      documentId: saved.document.id,
      amount: saved.organization.totalCost,
      snapshot: transaction.snapshot,
      company: data.company,
      reason: 'NEW_ORDER',
      status: 'POSTED'
    })
  })

  test('returns an existing operation without checking conflicts or writing again', async () => {
    findTransaction.mockResolvedValue(transaction)

    const result = await processNewOrder(data)

    expect(result).toMatchObject({
      success: true,
      data: { document: saved.document, transaction, dublicatedRequest: true },
      conflict: null
    })
    expect(findDocument).toHaveBeenCalledWith(saved.document.id)
    expect(findCustomer).not.toHaveBeenCalled()
    expect(findCustomerName).not.toHaveBeenCalled()
    expect(upsertDocument).not.toHaveBeenCalled()
    expect(createCharge).not.toHaveBeenCalled()
  })

  test.each(['reject', 'swap'] as const)('returns %s conflicts without writing', async (action) => {
    const currentDocument = action === 'swap' ? { ...saved.document, enumeration: '0001' } : null
    if (currentDocument) {
      findCustomer.mockResolvedValue({ Customer: saved.customer, Document: currentDocument })
    }
    findEnumeration.mockResolvedValue(conflictingDocument)

    const result = await processNewOrder(data)
    const year = currentDocument?.createdAt.getFullYear() ?? new Date().getFullYear()

    expect(result).toEqual({
      success: false,
      data: null,
      conflict: {
        action,
        year,
        enumeration: data.enumeration,
        currentDocument: currentDocument ? { id: currentDocument.id, enumeration: '0001' } : null,
        conflictingDocument: { id: conflictingDocument.id, enumeration: data.enumeration },
        conflictingCustomer: { fullName: conflictingCustomerFullName }
      }
    })
    expect(findEnumeration).toHaveBeenCalledWith(tx, data.enumeration, year)
    expect(findCustomerName).toHaveBeenCalledWith(conflictingDocument.customerId)
    expect(upsertDocument).not.toHaveBeenCalled()
    expect(createCharge).not.toHaveBeenCalled()
  })
})

describe('createDocuments', () => {
  test('returns the saved document ID for downloading', async () => {
    expect(await createDocuments(initialState, formData())).toEqual({
      success: true,
      data: { documentId: saved.document.id },
      conflict: null,
      values: data
    })
  })

  test.each(['reject', 'swap'] as const)(
    'preserves %s conflict details and form values',
    async (action) => {
      if (action === 'swap') {
        findCustomer.mockResolvedValue({ Customer: saved.customer, Document: saved.document })
      }
      findEnumeration.mockResolvedValue(conflictingDocument)

      const result = await createDocuments(initialState, formData())

      expect(result).toMatchObject({
        success: false,
        data: null,
        conflict: {
          action,
          conflictingDocument: { id: conflictingDocument.id },
          conflictingCustomer: { fullName: conflictingCustomerFullName }
        },
        values: data
      })
      expect(result.message).toContain(data.enumeration)
      expect(findCustomerName).toHaveBeenCalledWith(conflictingDocument.customerId)
      expect(upsertDocument).not.toHaveBeenCalled()
      expect(createCharge).not.toHaveBeenCalled()
    }
  )

  test('returns validation errors without starting a transaction', async () => {
    const result = await createDocuments(initialState, new FormData())

    expect(result).toMatchObject({ success: false, data: null, conflict: null })
    expect(result.error?.enumeration).toBeDefined()
    expect(runTransaction).not.toHaveBeenCalled()
  })

  test('returns database failures with the submitted values', async () => {
    upsertDocument.mockRejectedValue(new Error('Не удалось сохранить документ'))

    expect(await createDocuments(initialState, formData())).toEqual({
      success: false,
      data: null,
      conflict: null,
      message: 'Не удалось сохранить документ',
      values: data
    })
    expect(createCharge).not.toHaveBeenCalled()
  })
})
