import type { CustomersTable, DocumentsTable, OrganizationsTable } from '@Docify/db/schema'

export type DocumentRow = typeof DocumentsTable.$inferSelect
export type CustomerRow = typeof CustomersTable.$inferSelect
export type OrganizationRow = typeof OrganizationsTable.$inferSelect

export interface TransactionSnapshot {
  version: 1
  document: Omit<DocumentRow, 'updatedAt' | 'createdAt'>
  customer: Omit<CustomerRow, 'updatedAt' | 'createdAt' | 'pointOfSale'> & {
    // Version 1 snapshots created before pointOfSale was added do not include it.
    pointOfSale?: CustomerRow['pointOfSale']
  }
  organization: Omit<OrganizationRow, 'updatedAt' | 'createdAt'>
}
