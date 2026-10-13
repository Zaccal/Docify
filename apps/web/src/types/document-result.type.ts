import type { CostTransactionsTable, DocumentsTable } from '@Docify/db/schema'

type ConflictDocument = Pick<typeof DocumentsTable.$inferSelect, 'id' | 'enumeration'>

export interface ConflictingCustomer {
  fullName: string
}

export interface EnumerationConflict {
  action: 'reject' | 'swap'
  year: number
  enumeration: string
  currentDocument: ConflictDocument | null
  conflictingDocument: ConflictDocument
  conflictingCustomer: ConflictingCustomer
}

export interface DocumentResult<T = never> {
  success: boolean
  data: T | null
  conflict: EnumerationConflict | null
}

export type NewOrderResult = DocumentResult<{
  document: typeof DocumentsTable.$inferSelect
  transaction: typeof CostTransactionsTable.$inferSelect
  dublicatedRequest: boolean
}>
