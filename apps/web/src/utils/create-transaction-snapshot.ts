import type { CustomerRow, DocumentRow, OrganizationRow, TransactionSnapshot } from '@Docify/db'

interface CreateTransactionSnapshotParams {
  document: DocumentRow
  customer: CustomerRow
  organization: OrganizationRow
}

export function createTransactionSnapshot({
  document,
  customer,
  organization
}: CreateTransactionSnapshotParams): TransactionSnapshot {
  return {
    version: 1,
    document,
    customer,
    organization
  }
}
