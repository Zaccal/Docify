import { eq, type CustomerRow, type DocumentRow, type TransactionType } from '@Docify/db'
import { CustomersTable, DocumentsTable } from '@Docify/db/schema'
import 'server-only'

export async function findDocumentByCustomerIin(
  tx: TransactionType,
  iin: string
): Promise<{ Customer: CustomerRow; Document: DocumentRow | null } | null> {
  const [result] = await tx
    .select({
      Customer: CustomersTable,
      Document: DocumentsTable
    })
    .from(CustomersTable)
    .leftJoin(DocumentsTable, eq(CustomersTable.id, DocumentsTable.customerId))
    .where(eq(CustomersTable.iin, iin))
    .limit(1)
  return result ?? null
}
